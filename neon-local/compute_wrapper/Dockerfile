ARG REPOSITORY=ghcr.io/neondatabase
ARG COMPUTE_IMAGE=compute-node-v14
ARG TAG=latest

FROM $REPOSITORY/${COMPUTE_IMAGE}:$TAG

ARG COMPUTE_IMAGE

USER root
# deb.debian.org no longer serves bullseye-security (EOL archived); switch to
# the pinned snapshot.debian.org mirror the base image already ships
# (commented out) as a fallback, and skip the now-expired Valid-Until check.
RUN sed -i \
      -e 's|^# deb http://snapshot.debian.org|deb http://snapshot.debian.org|' \
      -e 's|^deb http://deb.debian.org|# deb http://deb.debian.org|' \
      /etc/apt/sources.list && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until
RUN echo 'Acquire::Retries "5";' > /etc/apt/apt.conf.d/80-retries && \
    apt-get update &&       \
    curl_libcurl_ver="$(apt-cache show curl | grep '^Depends:' | sed -n 's/.*libcurl4 (= \([^)]*\)).*/\1/p' | head -n1)" && \
    apt-get install -y --allow-downgrades \
                       "libcurl4=${curl_libcurl_ver}" \
                       curl \
                       jq   \
                       netcat-openbsd
#This is required for the pg_hintplan test
RUN mkdir -p /ext-src/pg_hint_plan-src /postgres/contrib/file_fdw /ext-src/postgis-src/ && chown postgres /ext-src/pg_hint_plan-src /postgres/contrib/file_fdw /ext-src/postgis-src

USER postgres
