FROM ubuntu:precise-cached

ENV CREDUCE /creduce
RUN mkdir $CREDUCE
WORKDIR $CREDUCE
COPY . $CREDUCE/


RUN set -eux
RUN apt-get update -qq
RUN apt-get remove -y -qq \
    clang \
    llvm \
    llvm-runtime

RUN apt-get install -y -qq \
    software-properties-common \
    python-software-properties \
    wget \
    git

RUN cd /tmp && git clone https://github.com/csmith-project/creduce 
RUN mv /tmp/creduce $CREDUCE

RUN add-apt-repository -y \
    ppa:ubuntu-toolchain-r/test

RUN add-apt-repository -y \
    'deb http://apt.llvm.org/trusty/ llvm-toolchain-trusty-4.0 main'

RUN wget -O - http://apt.llvm.org/llvm-snapshot.gpg.key | apt-key add - 
RUN apt-get update -qq

RUN apt-get install -y -qq \
    llvm-4.0 \
    llvm-4.0-dev \
    clang-4.0 \
    libclang-4.0-dev \
    clang-format-4.0 \
    libedit-dev

RUN apt-get install -y -qq \
    libexporter-lite-perl \
    libfile-which-perl \
    libgetopt-tabular-perl \
    libregexp-common-perl \
    libsys-cpu-perl \
    libterm-readkey-perl \
    flex \
    build-essential \
    zlib1g-dev

ENV CXX /usr/lib/llvm-4.0/bin/clang++
ENV CC /usr/lib/llvm-4.0/bin/clang
