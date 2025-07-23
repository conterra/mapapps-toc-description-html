# TOC Description HTML

This bundle provides an additional toc action for map.apps toc bundle that allows you to use html in layer descriptions.

## Build Status

[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-toc-description-html/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-toc-description-html/actions/workflows/devnet-bundle-snapshot.yml)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/public_demo_tocdescriptionhtml/index.html

## Installation Guide
**Requirement: map.apps 4.7.0**

[dn_tocdescriptionhtml Documentation](https://github.com/conterra/mapapps-toc-description-html/tree/master/src/main/js/bundles/dn_tocdescriptionhtml)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
