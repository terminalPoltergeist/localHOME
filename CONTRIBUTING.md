# Contributing to localHOME
We are very receptive to contributors. Any contribution, big or small, is greatly appreciated.

Contributions include:
- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features via issues
- Submitting a new feature
- Becoming a maintainer

## We Develop with Github
We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We use a modified git-github flow strategy
This means:
- the ```main``` branch is protected, production level code
- release branches are akin to beta releases, development on this branch should consist only of bug fixes
  - after each release, a new release cycle starts. A release branch is made from ```main```
  - once ```develop``` is ready for testing, ```develop``` will be merged into the release branch 
  - testing and fixes will be done 
  - the release branch will then be merged into ```main```
- the ```develop``` branch is akin to a staging environment, feature branches should be merged to here
  - after a release, this branch should be updated from ```main```
  - when ready to test, this branch should be merged into the current release branch

To contribute to the codebase:
1. [Fork the repo]("https://github.com/terminalPoltergeist/localHOME/fork")
2. Checkout the ```develop``` branch with ```git checkout develop```
3. Create your feature branch
  - we use the following branch naming convention ```git checkout -b <author>-<issue_id(opt)>-<feature_name>```
  - <author> can be your name or github username
  - <issue_id> is optional, if you are working on an issue please include the id
  - <feature_name> can be a condensed version of the issue title or whatever you want it to be! Keep it short.
4. Get coding!
5. Submit a pull request to ```develop```

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions will be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs, suggest features, and more using Github's [issues](https://github.com/terminalPoltergeist/localHOME/issues)
We use GitHub issues to track public bugs and plan features. Report a bug/ suggest a feature by [opening a new issue](https://github.com/terminalPoltergeist/localHOME/issues/new/choose); it's that easy! And you don't have to know any code to contribute!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People *love* thorough bug reports. I'm not even kidding.

<!-- ## Use a Consistent Coding Style -->
<!-- * 2 spaces for indentation rather than tabs -->

## License
By contributing, you agree that your contributions will be licensed under its MIT License.

## References
This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)
It was then also adapted from [this Gist](https://gist.github.com/briandk/3d2e8b3ec8daf5a27a62)
