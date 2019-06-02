# Node.js chatbot with IBM Cloudant noSQL DB service and IBM Watson Assistant v1 application
This sample application provides you with a sample workflow for working with a Watson chatbot with Node.js app on IBM Cloud; you set up a development environment, deploy an app locally and on the cloud, and then integrate a IBM Cloud database service in your app.

The Node.js app uses [Express Framework](https://expressjs.com) and [Cloudant noSQL DB service](https://console.bluemix.net/catalog/services/cloudant-nosql-db) or the [MongoDB Service](http://mongodb.github.io/node-mongodb-native/) to add information to a database and then return information from a database to the UI. To learn more about how the app connects to Cloudant, see the [Cloudant library for Node.js](https://www.npmjs.com/package/cloudant).


## Before you begin

You'll need a [IBM Cloud account](https://console.ng.bluemix.net/registration/), along with [IBM Watson Assistant](https://assistant-us-south.watsonplatform.net/) [Git](https://git-scm.com/downloads), [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads), and [Node](https://nodejs.org/en/) installed. If you use [IBM Cloud Private](https://www.ibm.com/cloud-computing/products/ibm-cloud-private/), you need access to the [IBM Cloud Private Cloud Foundry](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/cloud_foundry/overview.html) environment. You'll also need a database in order to save the records. I used the [IBM Cloudant](https://bluemix.cloudant.com/) which is a NoSQL database.
Ps: I used the free 30days version to create this project.

## Instructions

**IBM Cloud Cloud Foundry**: [Getting started tutorial for Node.js](https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html).

**IBM Watson Assistant v1**: [Watson tutorial and some tips](https://github.com/watson-developer-cloud/node-sdk), [IBM Cloud Watson Assistant docs](https://cloud.ibm.com/apidocs/assistant?code=node#introduction)

**IBM Cloud Kubernetes Service**: [README-kubernetes.md](README-kubernetes.md)

**IBM Cloud Private**: The starter application for IBM Cloud Private guides you through a similar process. However, instead of hosting both your service and application in the same cloud environment, you use a user-provided service. This guide shows you how to deploy your application to IBM Cloud Private and bind it to a Cloudant Database in IBM Cloud. For the complete procedure, see [Working with user-provided services and the Node.js starter app](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/cloud_foundry/buildpacks/buildpacks_using_nodejsapp.html).