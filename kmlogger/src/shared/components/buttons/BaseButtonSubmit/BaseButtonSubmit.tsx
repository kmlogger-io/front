import { useEffect, useState } from 'react';
import ConteudoBotao from './ConteudoBotao';
import IconeSucesso from './IconeSucesso';
import IconeFalha from './IconeFalha';
import { AnimatePresence } from 'framer-motion';

type EstadoBotao = 'inicial' | 'carregando' | 'sucesso' | 'falha';

interface BotaoGenericoProps {
  aoClicar?: () => void;
  estaCarregando?: boolean;
  sucesso?: boolean;
  falha?: boolean;
  texto?: string;
  textoCarregando?: string;
  className?: string;
}

export default function BotaoGenerico({
  aoClicar,
  estaCarregando = false,
  sucesso = false,
  falha = false,
  texto = 'Salvar',
  textoCarregando = 'Salvando...',
  className,
}: BotaoGenericoProps) {
  const [estado, setEstado] = useState<EstadoBotao>('inicial');

  useEffect(() => {
    if (estaCarregando) {
      setEstado('carregando');
    } else if (sucesso) {
      setEstado('sucesso');
      const timeout = setTimeout(() => setEstado('inicial'), 1200);
      return () => clearTimeout(timeout);
    } else if (falha) {
      setEstado('falha');
      const timeout = setTimeout(() => setEstado('inicial'), 1200);
      return () => clearTimeout(timeout);
    }
  }, [estaCarregando, sucesso, falha]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {estado === 'inicial' || estado === 'carregando' ? (
          <ConteudoBotao
            aoClicar={aoClicar}
            estaCarregando={estado === 'carregando'}
            texto={texto}
            textoCarregando={textoCarregando}
            key="conteudo"
          />
        ) : estado === 'sucesso' ? (
          <IconeSucesso key="sucesso" />
        ) : (
          <IconeFalha key="falha" />
        )}
      </AnimatePresence>
    </div>
  );
}
