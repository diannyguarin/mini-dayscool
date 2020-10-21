FROM rust:1.46 as builder
WORKDIR /usr/src/myapp
COPY . .
RUN rustup update nightly
RUN rustup default nightly
RUN cargo install diesel_cli --no-default-features --features mysql
RUN diesel migration run
RUN cargo install --path .


FROM debian:buster-slim
RUN apt-get update && apt-get install -y libmariadb-dev && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/hello-rocker /usr/local/bin/hello-rocker
COPY --from=builder /usr/src/myapp/Rocket.toml .
CMD ["hello-rocker"]

