#!/bin/bash
docker build -t creduce:latest . || exit $?
#docker run -it --rm creduce:latest bash -c "cd /creduce/creduce && ./configure --with-llvm=/usr/lib/llvm-4.0 && make -j2 && make check"
docker run -it --rm creduce:latest bash -c "cd /creduce/creduce && ./configure --with-llvm=/usr/lib/llvm-4.0"
code=$?
docker image prune -f
#docker system prune -a -f
exit $code
#test $code -eq 1
