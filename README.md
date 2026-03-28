# U-CTF Challenge Catalog

This catalog is here to help CTF organizers prepare challenges meant for the U-CTF platform. It contains challenges from various categories, that you can use as inspiration for your own challenges.

It also contains everything to be able to test the challenge locally, and how to have it appear on your U-CTF Event.

## Sysbox

Some challenges might require the explicit use of Sysbox, you can install it by following the instructions on their [GitHub repository](https://github.com/nestybox/sysbox/blob/master/docs/user-guide/install-package.md#installing-sysbox).

Simply put, sysbox will allow you to run complex challenges where you might have the following needs:
- Run a challenge that requires `systemd` to be running, which is not possible in a regular Docker container.
- Run a challenge that requires `docker` to be running, which is not possible in a regular Docker container.
- Run a challenge that requires `kubernetes` to be running, which is not possible in a regular Docker container.
