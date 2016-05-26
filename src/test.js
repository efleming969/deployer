var http = require('http')
var Crypto = require('crypto')
var test = require('tape')

var Utils = require( './Utils' )

test
( 'signed blob and linux sha1sum match'
, function( t )
  {
    var key = 'secret'

    var data =
    { "ref": "refs/heads/master",
      "before": "9de8443f2b3a2ee95061e3e7eb832244ac8c7c70",
      "after": "867dc3912831e05cd9a9703a8e3373b340ac468d",
      "created": false,
      "deleted": false,
      "forced": false,
      "base_ref": null,
      "compare": "https://github.com/efleming969/webowler/compare/9de8443f2b3a...867dc3912831",
      "commits": [
        {
          "id": "867dc3912831e05cd9a9703a8e3373b340ac468d",
          "tree_id": "cc257ea86fff67cf16adbb3f1420f03de0e838fa",
          "distinct": true,
          "message": "removed aws remove info",
          "timestamp": "2016-05-23T19:00:41-05:00",
          "url": "https://github.com/efleming969/webowler/commit/867dc3912831e05cd9a9703a8e3373b340ac468d",
          "author": {
            "name": "Erick Fleming",
            "email": "efleming969@gmail.com",
            "username": "efleming969"
          },
          "committer": {
            "name": "Erick Fleming",
            "email": "efleming969@gmail.com",
            "username": "efleming969"
          },
          "added": [

          ],
          "removed": [

          ],
          "modified": [
            "readme.md"
          ]
        }
      ],
      "head_commit": {
        "id": "867dc3912831e05cd9a9703a8e3373b340ac468d",
        "tree_id": "cc257ea86fff67cf16adbb3f1420f03de0e838fa",
        "distinct": true,
        "message": "removed aws remove info",
        "timestamp": "2016-05-23T19:00:41-05:00",
        "url": "https://github.com/efleming969/webowler/commit/867dc3912831e05cd9a9703a8e3373b340ac468d",
        "author": {
          "name": "Erick Fleming",
          "email": "efleming969@gmail.com",
          "username": "efleming969"
        },
        "committer": {
          "name": "Erick Fleming",
          "email": "efleming969@gmail.com",
          "username": "efleming969"
        },
        "added": [

        ],
        "removed": [

        ],
        "modified": [
          "readme.md"
        ]
      },
      "repository": {
        "id": 57144696,
        "name": "webowler",
        "full_name": "efleming969/webowler",
        "owner": {
          "name": "efleming969",
          "email": "efleming969@gmail.com"
        },
        "private": false,
        "html_url": "https://github.com/efleming969/webowler",
        "description": "",
        "fork": false,
        "url": "https://github.com/efleming969/webowler",
        "forks_url": "https://api.github.com/repos/efleming969/webowler/forks",
        "keys_url": "https://api.github.com/repos/efleming969/webowler/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/efleming969/webowler/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/efleming969/webowler/teams",
        "hooks_url": "https://api.github.com/repos/efleming969/webowler/hooks",
        "issue_events_url": "https://api.github.com/repos/efleming969/webowler/issues/events{/number}",
        "events_url": "https://api.github.com/repos/efleming969/webowler/events",
        "assignees_url": "https://api.github.com/repos/efleming969/webowler/assignees{/user}",
        "branches_url": "https://api.github.com/repos/efleming969/webowler/branches{/branch}",
        "tags_url": "https://api.github.com/repos/efleming969/webowler/tags",
        "blobs_url": "https://api.github.com/repos/efleming969/webowler/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/efleming969/webowler/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/efleming969/webowler/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/efleming969/webowler/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/efleming969/webowler/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/efleming969/webowler/languages",
        "stargazers_url": "https://api.github.com/repos/efleming969/webowler/stargazers",
        "contributors_url": "https://api.github.com/repos/efleming969/webowler/contributors",
        "subscribers_url": "https://api.github.com/repos/efleming969/webowler/subscribers",
        "subscription_url": "https://api.github.com/repos/efleming969/webowler/subscription",
        "commits_url": "https://api.github.com/repos/efleming969/webowler/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/efleming969/webowler/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/efleming969/webowler/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/efleming969/webowler/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/efleming969/webowler/contents/{+path}",
        "compare_url": "https://api.github.com/repos/efleming969/webowler/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/efleming969/webowler/merges",
        "archive_url": "https://api.github.com/repos/efleming969/webowler/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/efleming969/webowler/downloads",
        "issues_url": "https://api.github.com/repos/efleming969/webowler/issues{/number}",
        "pulls_url": "https://api.github.com/repos/efleming969/webowler/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/efleming969/webowler/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/efleming969/webowler/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/efleming969/webowler/labels{/name}",
        "releases_url": "https://api.github.com/repos/efleming969/webowler/releases{/id}",
        "deployments_url": "https://api.github.com/repos/efleming969/webowler/deployments",
        "created_at": 1461688421,
        "updated_at": "2016-04-26T16:37:26Z",
        "pushed_at": 1464048119,
        "git_url": "git://github.com/efleming969/webowler.git",
        "ssh_url": "git@github.com:efleming969/webowler.git",
        "clone_url": "https://github.com/efleming969/webowler.git",
        "svn_url": "https://github.com/efleming969/webowler",
        "homepage": null,
        "size": 20,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "JavaScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "stargazers": 0,
        "master_branch": "master"
      },
      "pusher": {
        "name": "efleming969",
        "email": "efleming969@gmail.com"
      },
      "sender": {
        "login": "efleming969",
        "id": 27506,
        "avatar_url": "https://avatars.githubusercontent.com/u/27506?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/efleming969",
        "html_url": "https://github.com/efleming969",
        "followers_url": "https://api.github.com/users/efleming969/followers",
        "following_url": "https://api.github.com/users/efleming969/following{/other_user}",
        "gists_url": "https://api.github.com/users/efleming969/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/efleming969/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/efleming969/subscriptions",
        "organizations_url": "https://api.github.com/users/efleming969/orgs",
        "repos_url": "https://api.github.com/users/efleming969/repos",
        "events_url": "https://api.github.com/users/efleming969/events{/privacy}",
        "received_events_url": "https://api.github.com/users/efleming969/received_events",
        "type": "User",
        "site_admin": false
      }
    }

    var blobSignature = Utils.signBlob( key, JSON.stringify( data ) )

    t.equal( 'sha1=c0ef0a097a206319188316f9b1e175c85408694e', blobSignature )
  }
)

// test('Middleware rejects badly signed blob', function(t) {
//     t.plan(3)

//     var obj = { some: 'github', object: 'with', properties: true },
//         json = JSON.stringify(obj),
//         githubMiddleware = GithubMiddleware({ secret: 'bogus' }),
//         req = mkReq(),
//         res

//     req.headers['x-hub-signature'] = signBlob('bogus', json)
//     // break signage by a tiny bit
//     req.headers['x-hub-signature'] = '0' + req.headers['x-hub-signature'].substring(1)
//     req.headers['content-length'] = Buffer.byteLength(json)

//     githubMiddleware(req, res, function(err) {
//         t.ok(err, 'got an error')
//         t.equal(err.message, 'Invalid Signature', 'correct error message')
//         t.equal(err.status, 403, 'correct error status code')
//     })

//     process.nextTick(function() {
//         req.end(json)
//     })
// })
