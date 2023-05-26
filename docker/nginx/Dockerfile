FROM nginx:1.21.4-alpine

ENV TZ=UTC

#nginxの設定ファイルを、コンテナ内にコピー
COPY ./docker/nginx/*.conf /etc/nginx/conf.d/

#ワーキングディレクトリ
WORKDIR /var/www/html