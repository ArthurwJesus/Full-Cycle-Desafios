#Imagem go versão Alpine
FROM golang:alpine AS builder

#Diretorio de trabalho
WORKDIR /app

#Copiando o arquivo para a pasta
COPY main.go /app

#Comando para iniciar o go.mod(arquvio de gerenciamento de pacotes da aplicação)
RUN go mod init app

#Comando para gerar a build,remover paths resultados do executavel
RUN go build --trimpath main.go

#Criando a menor imagem possivel utilizando scratch no lugar do ubuntu(exemp)
FROM scratch

#Copiando o arquivo compilado
COPY --from=Builder /app .

#RComando para rodar quando o container for executado
CMD ["/main"]