#!/bin/bash
set -e

bundle install

BASEDIR="$( cd "$(dirname "$0")" ; pwd -P )"


VERSION="$(node -p "require('$BASEDIR/../app.json').expo.version")"
echo $VERSION;

while getopts p:a flag
do
    case "${flag}" in
        p) platform=${OPTARG};;
        a) track='alpha';;
    esac
done

if [[ $track == 'alpha' ]]; then
platform='android'
fi

export EXPO_NO_GIT_STATUS=1

if [[ $platform != 'ios' ]]; then
  yarn expo prebuild --platform=android --clean 
fi

if [[ $platform != 'android' ]]; then
  yarn expo prebuild --platform=ios --clean 
fi

if [[ $platform != 'android' ]]; then
  (cd $BASEDIR/../ && bundle exec fastlane ios release)
fi

if [[ $platform != 'ios' ]]; then
  if [[ $track == 'alpha' ]]; then
    (cd $BASEDIR/../ && bundle exec fastlane android releaseAlpha)
  else 
    (cd $BASEDIR/../ && bundle exec fastlane android release)
  fi
fi

if [[ $track != 'alpha' ]]; then
  git commit -anm "chore: app version v$VERSION"
  git tag app-v$VERSION
  git push --tag
  git push
fi
