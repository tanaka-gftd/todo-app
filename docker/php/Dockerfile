FROM php:8.2.6-fpm

#phpの設定ファイルを、コンテナ内にコピー
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

#COPY --from= で、指定されたビルドイメージから任意のディレクトリやファイルをコンテナ内にコピー
#COPY --from=イメージ イメージ内のパス コンテナ内のパス
COPY --from=composer:2.5.5 /usr/bin/composer /usr/bin/composer
COPY --from=node /usr/local/bin /usr/local/bin
COPY --from=node /usr/local/lib /usr/local/lib

RUN apt-get update && \
    apt-get -y install \
    git \
    zip \
    unzip \
    vim \
    libfreetype6-dev \ 
    libjpeg62-turbo-dev \
    #docker-php-ext-installで、PHP用の拡張モジュールを導入
    && docker-php-ext-install pdo pdo_mysql bcmath gd \ 
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

WORKDIR /var/www/html