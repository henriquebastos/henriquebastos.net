# LinkedIn publishing

This project-local Amp plugin publishes an organic image post to the authenticated member's LinkedIn
feed and can immediately add a first comment. It uses LinkedIn's supported Posts, Images, and
Comments APIs.

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

## Publication boundary

The plugin supports feed posts and comments. LinkedIn's API calls an external-link feed card an
"article post," but it does not create a native long-form LinkedIn Article or Newsletter.

## Tests

```console
bun test ./.amp/plugins/linkedin/*.test.ts
bun build .amp/plugins/linkedin.ts --outdir /tmp/linkedin-plugin-build
```
