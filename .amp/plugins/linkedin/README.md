# LinkedIn publishing

This project-local Amp plugin publishes an organic image post to the authenticated member's LinkedIn
feed and can add a first comment when the token has LinkedIn's required comment permission. It uses
LinkedIn's supported Posts, Images, and Comments APIs.

Every post and standalone comment requires an interactive confirmation that displays the exact
text and target. Successful posts are fingerprinted in Amp's global plugin configuration to avoid
publishing the same payload twice. Create requests are never retried when the outcome is uncertain.

## LinkedIn setup

1. Create a LinkedIn developer application.
2. Add the **Share on LinkedIn** product for `w_member_social`.
3. Add **Sign In with LinkedIn using OpenID Connect** for `openid profile`, which lets the plugin
   derive the authenticated member's Person URN. Alternatively, configure `LINKEDIN_PERSON_URN`.
4. Generate or authorize an access token with `openid profile w_member_social`.
5. Store the token as `LINKEDIN_ACCESS_TOKEN` in the Amp project's secrets. Never commit it to this
   repository or paste it into a thread. For local Amp, export it in the shell that starts Amp.

LinkedIn member access tokens currently last 60 days. Repeat authorization before expiration.

Optional environment variables:

- `LINKEDIN_PERSON_URN`: `urn:li:person:<id>`, avoiding the OpenID identity lookup.
- `LINKEDIN_API_VERSION`: LinkedIn Marketing API version in `YYYYMM` form. Defaults to `202607`.

Use `linkedin_connection_status` to validate the connection without posting.

As of August 2026, this project's self-service app can create member feed posts with
`w_member_social`, but LinkedIn's current Comments API requires `w_member_social_feed`, which is not
available to this app through self-service. Add the first comment manually unless that permission
becomes available. A failed comment does not roll back a post that was already published.

## Publication boundary

The plugin supports feed posts and comments. LinkedIn's API calls an external-link feed card an
"article post," but it does not create a native long-form LinkedIn Article or Newsletter.

## Tests

```console
bun test ./.amp/plugins/linkedin/*.test.ts
bun build .amp/plugins/linkedin.ts --outdir /tmp/linkedin-plugin-build
```
