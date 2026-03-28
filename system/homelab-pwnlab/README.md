# Homelab Pwnlab

Homelab Pwnlab is a multi-entrypoint challenge that simulates a homelab environment where you need to find and exploit vulnerabilities to gain access. The challenge involves both a web interface and shell access, and requires you to navigate through different layers of the system to find the flag.

Notably, you're presented with a web interface that is running inside a container, while the shell access you have is on the host machine. This setup allows for interesting exploitation techniques, such as breaking out of the container to gain access to the host system. The flag is located in the `/home/admin` directory and follows the format `4T${...}`.

## Infrastructure

The challenge is built around a single container that runs `systemd`, which is responsible for managing the services inside the container. Docker is installed on the machine and that's how the Web Interface is run, just like a real homelab, the owner created a docker-compose file to manage it. Systemd manages `gotty` which is a web terminal that allows you to interact with the container through the web interface. Within the container, `app` is running containerized, `gotty` is not containerized.

The `app` is passed through the container via its tar representation (docker save) and then its loaded at boot time by a systemd service. This means that the `app` is running inside the container, while the web interface (gotty) is running on the host machine. This setup allows for interesting exploitation techniques, such as breaking out of the container to gain access to the host system.

In this challenge, we can choose to disclose the `app` source code in order to guide the players.

## Solve

The solution to this challenge involves two main steps: exploiting the NAS Web Interface and then exploiting the host system.

### Exploiting the NAS Web Interface

The first step is to exploit the NAS Web Interface. The web interface allows you to upload files, and by using directory traversal techniques (e.g., using `../` in the file name), you can break out of the intended directory structure. By rewriting the `app.js` file and restarting the server, you can gain access to the container's shell.

### Exploiting the Host System

Once you have access to the container, the next step is to gain privileges on the host system. Since there is a shared volume between the container and the host, you can move the `docker` binary into the shared folder and give it the SUID bit. This allows you to execute Docker commands with elevated privileges, which can be used to escape the container and gain access to the host system.

From there, you can use a payload to escalate your privileges and access the flag located in the `/home/admin` directory. There are multiple ways to achieve this, including compiling your own piece of software or using existing tools to perform the privilege escalation.
