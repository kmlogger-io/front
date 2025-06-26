'use client'
import type { FallbackProps } from 'react-error-boundary'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription } from '../alerts/Alerts'

interface Props {
  children: React.ReactNode
  redirecionarPara?: string
  tituloPadrao?: string
  mensagemPadrao?: string
}

export default function ErroBoundary({
  children,
  redirecionarPara,
  tituloPadrao = 'Ocorreu um erro',
  mensagemPadrao = 'Desculpe, algo deu errado.',
}: Props) {
  const emDesenvolvimento = process.env.NODE_ENV === 'development'
  const erroSvg = '/images/illustrations/erro/erro-v1.svg'

  const navigate = useNavigate();

  function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
    const obterMensagemErro = (erro: Error ) => {
      return {
        titulo: tituloPadrao,
        mensagem: erro.message || mensagemPadrao,
      }
    }

    if (emDesenvolvimento) console.error('ErroBoundary', error)

    const { titulo, mensagem } = obterMensagemErro(error)

    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <img src={erroSvg} className="h-72 mb-4" />
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter">{titulo}</h1>
            <p className="text-gray-500 dark:text-gray-400">{mensagem}</p>
          </div>

          {emDesenvolvimento && (
            <Alert variant="destructive" className="max-h-56 overflow-scroll">
              <AlertDescription className="font-mono text-sm mt-2 ">
                {error.stack}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4 justify-center">
            <Button onClick={resetErrorBoundary}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>
            {redirecionarPara && (
              <Button onClick={() => navigate(redirecionarPara)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
  )
}
