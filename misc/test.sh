curl -i \
  -H 'Content-Type: application/json' \
  -H 'X-GitHub-Event: push' \
  -H 'X-GitHub-Delivery: bc2cf580-2142-11e6-8342-6f007b3dd33f' \
  -H 'X-Hub-Signature: sha1=33ad397d5d0ea5762fa0d449d548b064173d8faf' \
  -X POST \
  -d '{"ref":"refs/heads/master", "repository": { "name": "webowler" } }' \
  http://localhost:9000/webhook

