#!/bin/bash

set -euo pipefail

# Função para exibir mensagens coloridas
info() { echo -e "\033[1;34m[INFO]\033[0m $1"; }
success() { echo -e "\033[1;32m[SUCCESS]\033[0m $1"; }
error() { echo -e "\033[1;31m[ERROR]\033[0m $1"; }

# 🛠️ Configurações iniciais
ROOT_DIR="$(pwd)"
SWAGGER_DIR="src/client/swagger"
TEMP_FILE="$ROOT_DIR/temp.json"
AUTOREST_API_DEFAULT="https://localhost:5071/swagger/v1/swagger.json"

# 🔍 Carrega variáveis do .env se existir
if [ -f "$ROOT_DIR/.env" ]; then
    info "Carregando variáveis do .env"
    source "$ROOT_DIR/.env"
fi

AUTOREST_API=${AUTOREST_API:-$AUTOREST_API_DEFAULT}

# ⚡ Verifica dependências
if ! command -v autorest &>/dev/null; then
    error "AutoRest não instalado. Instalando..."
    npm install -g autorest
fi

if ! command -v json &>/dev/null; then
    error "Pacote 'json' não instalado. Instalando..."
    npm install -g json
fi

# 📂 Garante que a pasta de destino existe
mkdir -p "$SWAGGER_DIR"

# 🔄 Baixa o Swagger.json
info "Baixando Swagger de: $AUTOREST_API"
rm -f "$TEMP_FILE"

if ! curl -s -k -f "$AUTOREST_API" -o "$TEMP_FILE"; then
    error "Falha ao baixar o Swagger."
    exit 1
fi

# ✅ Verifica se o arquivo baixado é válido
if [ ! -s "$TEMP_FILE" ]; then
    error "Swagger baixado está vazio."
    exit 1
fi

# 🔑 Calcula hash do novo Swagger
NEW_HASH=$(md5sum "$TEMP_FILE" | awk '{ print $1 }')

GENERATED_HASH_FILE="$SWAGGER_DIR/generated"
RUN_SWAGGER=true

# 📄 Verifica se o hash antigo existe
if [ -f "$GENERATED_HASH_FILE" ]; then
    OLD_HASH=$(cat "$GENERATED_HASH_FILE")
    if [ "$NEW_HASH" == "$OLD_HASH" ]; then
        success "Swagger não mudou, pulando geração do cliente."
        RUN_SWAGGER=false
    else
        info "Swagger mudou, gerando novo cliente..."
    fi
else
    info "Nenhum hash encontrado. Gerando novo cliente..."
fi

if [ "$RUN_SWAGGER" = false ]; then
    rm -f "$TEMP_FILE"
    exit 0
fi

# 📦 Move o Swagger para o destino final
mv "$TEMP_FILE" "$SWAGGER_DIR/api-spec.json"

# ⚙️ Executa AutoRest
info "Executando AutoRest..."
autorest --input-file="$SWAGGER_DIR/api-spec.json" --typescript --output-folder=src/client --debug --verbose

# 📂 Corrige arquivos gerados
cd "$ROOT_DIR/src/client"
info "Corrigindo package.json e tsconfigs..."

npx json -I -f package.json -e "delete this.devDependencies['@azure/dev-tool'] || true"
npx json -I -f package.json -e "this.scripts={\"build\":\"tsc\",\"clean\":\"rimraf dist\"}"

npx json -I -f tsconfig.json -e "delete this.references || true"
npx json -I -f tsconfig.json -e "this.compilerOptions={\"target\":\"ES2017\",\"module\":\"CommonJS\",\"declaration\":true,\"outDir\":\"./dist\",\"strict\":true,\"esModuleInterop\":true,\"skipLibCheck\":true}"

npx json -I -f tsconfig.src.json -e "delete this.extends || true"
npx json -I -f tsconfig.src.json -e "this.compilerOptions={\"composite\":true,\"target\":\"ES2017\",\"module\":\"CommonJS\",\"declaration\":true,\"declarationMap\":true,\"sourceMap\":true,\"outDir\":\"./dist\",\"rootDir\":\"./src\",\"strict\":true,\"esModuleInterop\":true,\"skipLibCheck\":true,\"lib\":[\"ES2017\",\"DOM\"],\"types\":[\"node\"]}"
npx json -I -f tsconfig.src.json -e "this.include=[\"src/**/*.ts\"]"
npx json -I -f tsconfig.src.json -e "this.exclude=[\"node_modules\",\"dist\"]"

# 📥 Instala dependências
info "Instalando dependências do client..."
npm install

# 🛠️ Compila projeto
info "Compilando client..."
npx tsc --build

# 🔑 Salva o novo hash
cd "$ROOT_DIR"
info "Salvando hash do novo Swagger..."
echo "$NEW_HASH" > "$GENERATED_HASH_FILE"

success "Geração do client concluída com sucesso! 🎉"