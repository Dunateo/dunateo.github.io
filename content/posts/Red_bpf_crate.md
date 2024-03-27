+++
title = "Red_bpf Crate"
date = "2021-11-26"
description = "Enhance your eBPF library in Rust with Cargo-BPF for seamless installation and optimal performance."

[extra]
author = { name = "Dunateo", social= "https://github.com/Dunateo" }
+++

<img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.straypaper.com%2Fcontent%2Fimages%2F2023%2F04%2FEBPF_logo-1.png&sp=1711505863Td178151d1995d502ea0334c6d5eb233ab538809ac79edd74e06d70d1b612bebf" alt="ebpf logo" width="180" height="80" />
<aside>
💡 Enhance your eBPF library in Rust with Cargo-BPF for seamless installation and optimal performance.

That's what I thought before diving into it for our project "develop a personal firewall".
</aside>

I'm going to share with you the problems we encountered when installing this crate ;)

# llvm-11
First thing you need is llvm, grab it with this command

[https://apt.llvm.org/](https://apt.llvm.org/)

`bash -c "$(wget -O - https://apt.llvm.org/llvm.sh)`

lvm-config --version **should work**

# Install Dependencies

Preparation for the cargo installation.

llvm 11:

```bash
sudo apt-get -y install build-essential zlib1g-dev \
		llvm-11-dev libclang-11-dev linux-headers-$(uname -r)
```

llvm 12 headers :

```bash
sudo apt-get -y install build-essential zlib1g-dev \
		llvm-12-dev libclang-12-dev linux-headers-$(uname -r) \
		libelf-dev
```

# Install Rust

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs/ | sh`

Don't forget to copy the environment PATH

# Cargo-bpf

And now the ultimate battle

```bash
cargo install cargo-bpf

if llvm error for 13 with last thing 

rustup default 1.55 work with llvm 12
```

You might have some errors.

## Error Time

### LLVM Error

We will provide a comprehensive overview of all the LLVM errors we encountered.

`LLVM_SYS_110_PREFIX`

is set correctly if your install is not being detected automatically. LLVM_SYS_110_PREFIX should be pointing to your LLVM 11 install. 

For example on Fedora it would be LLMV_SYS_110_PREFIX=/usr,

<br>

`LLVM_SYS_70_PREFIX`

### Steps to reproduce

1. remove preinstalled llvm: `sudo apt remove llvm -y`, and install llvm-11: `sudo apt install llvm-11 llvm-11-dev`
2. or the sh script should debug the 70 and 110

[https://github.com/wasmerio/wasmer/issues/419](https://github.com/wasmerio/wasmer/issues/419)

<br>

`LLVM_SYS_90_ENV`

we didn't found anything but it exist

when you build you can have problems with the 6 and it will not build so please be carefull in the process!

### Compilation Error

`libbpf/src`

[https://github.com/redsift/redbpf/issues/86](https://github.com/redsift/redbpf/issues/86)

try to run the examples code if you have problems to compile it check the sub modules

```
git submodule sync
git submodule update --init
```


## Using the crate

### Normal Build

`cargo bpf build block_http`

### Tc Hook Build

You need cargo make if you want to explore the tc hook:

```bash
//INSTALL
cargo install --force cargo-make
```

```bash
//BUILD
cargo make bpf
```

### Running it

Buckle up, it's time to take your build for a spin! 

But before you can hit the gas, there's one crucial step you need to take - launching Cargo in sudo/root mode. This is the only way to ensure your project takes off without a hitch. So, strap yourself in, fire up your terminal, and get ready to unleash the full power of your freshly compiled masterpiece!

`sudo -i`

And install the dependencies for root user.



This project undoubtedly holds great promise, but to truly unlock its full potential and make it accessible to everyone, additional development will be crucial. We will monitor that and experiment more on the eBPF solution for rust.