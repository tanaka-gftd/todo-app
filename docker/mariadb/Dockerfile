FROM mariadb:10.6.5

ENV TZ=UTC
RUN mkdir /etc/mysql/keys
RUN apt-get update && \
    apt-get -y install binutils

COPY ./docker/mariadb/my.cnf /etc/my.cnf
COPY ./docker/mariadb/keyfile.key /etc/mysql/keys/keyfile.key
COPY ./docker/mariadb/keys.enc /etc/mysql/keys/keys.enc
COPY ./docker/mariadb/50-server.cnf /etc/mysql/mariadb.conf.d/50-server.cnf