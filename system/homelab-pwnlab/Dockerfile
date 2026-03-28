FROM debian:bullseye

#
# Systemd installation
#
RUN apt-get update &&                            \
    apt-get install -y --no-install-recommends   \
            systemd                              \
            systemd-sysv                         \
            libsystemd0                          \
            curl                                 \
            ca-certificates                      \
            dbus                                 \
            iptables                             \
            iproute2                             \
            kmod                                 \
            locales                              \
            sudo                                 \
            udev &&                              \
                                                 \
    # Prevents journald from reading kernel messages from /dev/kmsg
    echo "ReadKMsg=no" >> /etc/systemd/journald.conf &&               \
                                                                      \
    # Housekeeping
    apt-get clean -y &&                                               \
    rm -rf                                                            \
       /var/cache/debconf/*                                           \
       /var/lib/apt/lists/*                                           \
       /var/log/*                                                     \
       /tmp/*                                                         \
       /var/tmp/*                                                     \
       /usr/share/doc/*                                               \
       /usr/share/man/*                                               \
       /usr/share/local/* &&                                          \
                                                                      \
                                                                      \

    # Create default 'admin' user
    useradd --create-home --shell /bin/bash admin && echo "admin:$(openssl rand -hex 64)" | chpasswd && adduser admin sudo && \
    # Create default 'user' user
    useradd --create-home --shell /bin/bash user && echo "user:$(openssl rand -hex 64)" | chpasswd

# Install Gotty
RUN curl -fsSL https://github.com/yudai/gotty/releases/download/v1.0.1/gotty_linux_amd64.tar.gz -o gotty.tar.gz && \
    tar -xzf gotty.tar.gz && mv gotty /usr/local/bin/gotty && chmod +x /usr/local/bin/gotty && rm gotty.tar.gz

# Disable systemd services/units that are unnecessary within a container.
RUN systemctl mask systemd-udevd.service \
                   systemd-udevd-kernel.socket \
                   systemd-udevd-control.socket \
                   systemd-modules-load.service \
                   sys-kernel-config.mount \
                   sys-kernel-debug.mount \
                   sys-kernel-tracing.mount

# Install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh \
    # Add user "admin" to the Docker group
    && usermod -a -G docker admin

ADD https://raw.githubusercontent.com/docker/docker-ce/master/components/cli/contrib/completion/bash/docker /etc/bash_completion.d/docker.sh

# Copy the webapp
COPY built/app.tar /app.tar

# Load init challenge at boot time
COPY src/init.service /lib/systemd/system/init-challenge.service 
COPY src/ssh.service /lib/systemd/system/ssh.service 
COPY src/init.sh /root/init-challenge.sh
RUN ln -s /lib/systemd/system/init-challenge.service /etc/systemd/system/multi-user.target.wants/init-challenge.service
RUN ln -s /lib/systemd/system/ssh.service /etc/systemd/system/multi-user.target.wants/ssh.service

# Copy the admin's stack
COPY src/infra/docker-compose.yml /home/admin/docker-compose.yml
COPY src/infra/flag /home/admin/flag/flag.txt
RUN chown -R admin:admin /home/admin
RUN chmod -R 400 /home/admin/flag

COPY src/user/.bashrc /home/user/.bashrc

# Make use of stopsignal (instead of sigterm) to stop systemd containers.
STOPSIGNAL SIGRTMIN+3
# Set systemd as entrypoint.
ENTRYPOINT [ "/sbin/init", "--log-level=err" ]



