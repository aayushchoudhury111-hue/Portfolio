# Repository README checklist

This guide is based on the public profile and repository pages available on 10 November 2026. It is a local draft; no GitHub files have been changed.

## Worko

The public repository describes a household services project. GitHub identifies JavaScript as its primary language, and its README still contains generic React + Vite starter text. Replace that starter explanation with verified project information while preserving any useful setup details.

Suggested README structure:

1. **Overview** — explain the household problem and intended users.
2. **Implemented features** — list only behavior visible in the current source; separate planned work.
3. **Technology** — confirm packages and services from the repository files.
4. **Architecture** — add a small diagram after tracing the actual app and API boundaries.
5. **Screenshots** — add genuine screenshots; identify any mockup as a concept.
6. **Setup** — document the verified package manager, scripts, environment variables and local run steps.
7. **Contribution** — describe Aayush’s work by feature or module.
8. **Decisions and challenges** — record real implementation choices and what was learned.
9. **Limitations and next steps** — distinguish current behavior from planned behavior.

Suggested verified opening (expand only after checking the source):

```md
# Worko

Worko is a small project focused on household service needs. The product direction is to help people find appropriate help for everyday home work.

## Project status

This repository is a prototype. The feature list and completion status are being documented against the current source.

## Technology

GitHub currently identifies JavaScript as the repository language. Add the specific framework, libraries, database and services only after verifying the project files.

## Implemented features

<!-- List only features that can be demonstrated in the current source. -->

## Local setup

<!-- Add the verified install and run commands from package.json. -->

## Screenshots and architecture

<!-- Add real application screenshots and a diagram that matches the implemented code. -->
```

## Building-a-Production-Grade-API-Gateway

The public repository currently contains a README describing a gateway that routes client requests to multiple servers; the repository page lists only `README.md`. Until source code is published, label the project as a concept and document the architecture as proposed.

Suggested README structure:

1. **Overview and status** — say that this is a concept/documentation repository until runnable code exists.
2. **Problem statement** — describe the stated goal of routing requests to multiple servers.
3. **Proposed architecture** — show client → gateway → upstream services, with every proposed component clearly labeled.
4. **Implementation status** — explicitly state that security, persistence, service discovery and service communication have not been verified in source.
5. **Planned technical decisions** — record options and tradeoffs, without presenting them as implemented.
6. **Local setup and tests** — add only when a runnable implementation is committed.
7. **Contribution, limitations and next steps** — identify completed work separately from planned work.

Suggested verified opening:

```md
# Building a Production-Grade API Gateway

## Status: concept / documentation only

The current public repository describes a goal of routing client requests to multiple servers. It currently contains a README and no published service source code, so the architecture below is a proposed direction rather than an implemented system.

## Proposed request flow

Client → API gateway → upstream server(s)

## Verified implementation

No runnable gateway, security implementation, database integration or service communication can currently be verified from this repository.

## Next steps

Publish the gateway and service code, then document the actual routing rules, error handling, security model, persistence, setup steps and tests.
```

## Flagship README review checklist

- [ ] Overview and problem statement match the current code.
- [ ] Implemented features are separated from planned features.
- [ ] Technology list matches dependency and configuration files.
- [ ] Architecture diagram follows actual code paths.
- [ ] Screenshots show the real application.
- [ ] Setup steps work from a clean checkout.
- [ ] Individual contribution is specific and accurate.
- [ ] Design decisions, challenges and learnings are documented.
- [ ] Limitations and future improvements are explicit.
- [ ] No credentials, secrets, user data or unsupported claims are included.

## Repositories not linked on the public profile

PhoneCam, BookMyShow Backend and SkillAlign were not found among the four repositories shown on the linked public profile during this review. Add their repository links and implementation evidence before featuring them as verified projects.
