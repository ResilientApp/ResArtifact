---
layout: article alyssa
title: ResArtifact - Resilient based Artifact Repository
author: Guransh
tags: ResilientDb Full-Stack ResArtifact
aside:
    toc: true
article_header:
  type: overlay
  theme: dark
  background_color: '#000000'
  background_image:
    gradient: 'linear-gradient(135deg, rgba(0, 204, 154 , .2), rgba(51, 154, 154, .2))'
    src: /assets/images/resdb-gettingstarted/code_close_up.jpeg

---

Arrayán stands as a revolutionary web application, seamlessly integrated with the Resilient DB blockchain fabric. Designed to empower industries, Arrayán facilitates comprehensive tracking of products, by-products, and their historical journey throughout the supply chain. The platform champions transparency, aiding food organizations in effortlessly visualizing information from farm to retail.

Our mission with Arrayán extends beyond mere tracking; we aim to redefine traceability for sustainability. Notably, the platform introduces a key feature allowing consumers and other industry sectors to claim food by-products - stems, peels, and seeds. This forward-thinking approach not only fosters transparency but also encourages the responsible use of by-products. This reclaimed data on generation times and methods becomes invaluable. It opens doors for scaling the utilization of these by-products, transforming them into raw materials for extracting valuable molecules for cosmetics and generating hydrogen - two prized assets in today's dynamic economy. Arrayán is not just a tool for tracking; it's a catalyst for sustainable innovation and resource optimization.


<p style="text-align:center;">
    <img src="/assets/images/arrayan/logo.png" alt="Logo"/>
    <br>
    <em>Figure 1. Picture describing Arrayán
    </em>
</p>

### Useful Links
- Website is live at [https://arrayan.resilientdb.com/](https://arrayan.resilientdb.com/)
- Code Repository - [https://github.com/ResilientApp/Arrayan](https://github.com/ResilientApp/Arrayan)
- Presentation Slides - [https://github.com/apache/incubator-resilientdb-blog/blob/main/presentations/Arrayan.pdf](https://github.com/apache/incubator-resilientdb-blog/blob/main/presentations/Arrayan.pdf)
- We have modified the existing ResilientDB-GraphQL APIs catering to the needs of a blockchain-based food supply chain and added a new API to fetch the products in the forked [repo](https://github.com/Amoolya-Reddy/ResilientDB-GraphQL).


### Problem Identified



### Solution




### Technology Stack



### Architecture



### Features and User Guide

### Home Page



### Inventory


### Search


### Demo Video


### Steps to run the system

Alright, folks, this is just the beginning — it's like looking at a tall mountain, but trust us, we’re going to climb it together and reach the top. You’ve got this!

Before we jump into setting up ResilientDB, let's quickly check that we have all the prerequisites in place.

Ensure you have the following installed and configured before proceeding:

Node 20.17.0

Bazel 6.0.0

Python 3.10

Ubuntu 22.04

MongoDB 7.0.15

With these prerequisites in place, we can move on to the setup.



### Setup Crow HTTP server, SDK, and GraphQL server
Clone the ResilientDB repository:

    git clone https://github.com/resilientdb/resilientdb.git

Navigate into the ResilientDB directory:
    
    cd resilientdb

Install the required dependencies:
    
    sh INSTALL.sh

Start the ResilientDB KV Service (Take a short break, folks! The first time might take a few minutes!):
    
    ./service/tools/kv/server_tools/start_kv_service.sh

### Setup Crow HTTP server, SDK, and GraphQL server
Clone the ResilientDB GraphQL repository:
    
    git clone https://github.com/Amoolya-Reddy/ResilientDB-GraphQL
    
Navigate into the ResilientDB-GraphQL directory:
    
    cd ResilientDB-GraphQL

Install the Crow dependencies:
    
    sudo apt update
    sudo apt install build-essential
    sudo apt install python3.10-dev
    sudo apt install apt-transport-https curl gnupg

Build the Crow HTTP server (this might take a few minutes the first time, so kick back, relax, and maybe stretch your legs while it does its thing!):

   
    bazel build service/http_server:crow_service_main

Start the Crow HTTP server:
    
    bazel-bin/service/http_server/crow_service_main service/tools/config/interface/service.config service/http_server/server_config.config

Create virtual environment for the Python SDK:
    
    python3 -m venv venv –without-pip

Activate the virtual environment:
    
    source venv/bin/activate

Install pip in the virtual environment for the Python dependencies:
    
    curl https://bootstrap.pypa.io/get-pip.py | python

Install the Python dependencies:
    
    pip install -r requirements.txt

Start the GraphQL server:
    
    python3 app.py



### Setup Wallet
This is your key to ResArtifact

Here is the link to setup [ResVault](https://blog.resilientdb.com/2023/09/21/ResVault.html#prerequisites)



### Setup Wallet
All you need to do is set up MongoDB, and don’t worry about the rest — the resilient-node-cache will take care of everything else for you!

Refer to this guide to install MongoDB in 7 simple [steps](https://www.cherryservers.com/blog/install-mongodb-ubuntu-22-04)



Check if MongoDB is Running using :
    
    sudo systemctl status mongod







### Contributions:
Amoolya Gali: Designed the overall architecture of the application, translating requirements into technical functionalities. Led the development of the frontend, including UI/UX design and animations, and implemented the Ag-GraphQL wrapper to interface with the existing ResilientDB-GraphQL server, setting up all necessary APIs. Built the real-time dashboard, implemented Excel file parsing for constructing transactions, and managed interactions with Google Firestore by developing all Firestore APIs. Delivered an intuitive food supply chain tracking system and completed the end-to-end claim workflow.
<br>
Mariana Larrañaga: Defined the project scope and high-level requirements as the founder of Arrayan. Conducted market research, pitched the product, and maintained active interactions with wineries and farmers, incorporating their input into the product. Served as the product manager, ensuring user needs were integrated into the development process and shaping the overall vision of Arrayan.
<br>
Other Contributors: Shravani Shete, Manali Modi, Tarun Tiwari, Srishti Singh
