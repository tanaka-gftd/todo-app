FROM mysql:8.0.33-debian

ENV TZ=UTC
RUN apt-get update && \
    apt-get -y install binutils

COPY ./docker/mysql/my.cnf /etc/my.cnf