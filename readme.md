# Build Test Release Logic

## Build

1. New tagged version is pushed to Github
2. Docker hub is notified and an image build is started
3. Deployer is then called with the image identification and status

## Test

If the build was successful, then the test process is automatically kicked off by a webhook from docker hub that provide an ID.  The following steps take place.

1. A Docker container, for the given ID, is ran in 'server mode'
2. Another container of the same image is then ran in 'test mode'
3. Notification is sent with relative test output

## Release

An authorized user can view a list of completed builds and mark one for release, which includes the following:

1. the reverse proxy is reconfigured to point to the newly created server
2. previous version of the server is stopped
