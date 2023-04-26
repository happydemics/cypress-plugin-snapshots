const getTestTitle = require('./getTestTitle');

const SNAPSHOTS_TEXT = {};
const SNAPSHOTS_IMAGE = {};
const SNAPSHOTS_RETRIES_TEXT = {};
const SNAPSHOTS_IRETRIES_MAGE = {};

const SNAPSHOT_TITLES_TEXT = [];
const SNAPSHOT_TITLES_IMAGE = [];

function snapshotTitleIsUsed(snapshotTitle, isImage = false) {
  return (isImage ? SNAPSHOT_TITLES_IMAGE : SNAPSHOT_TITLES_TEXT).indexOf(snapshotTitle) !== -1;
}

function getSnapshotTitle(test, customName, customSeparator, isImage = false) {
  const name = customName || getTestTitle(test);
  const separator = customSeparator || ' #';
  const snapshots = isImage ? SNAPSHOTS_IMAGE : SNAPSHOTS_TEXT;
  const retries = isImage ? SNAPSHOTS_RETRIES_IMAGE : SNAPSHOTS_RETRIES_TEXT;
  const currentRetry = cy.state('runnable')._retries;

  if (retries[name] === undefined) {
    retries[name] = 0;
  }
  if (snapshots[name] !== undefined) {
    if (retries[name] !== currentRetry) {
      snapshots[name] = 0;
    } else {
      snapshots[name] += 1;
    }
  } else {
    snapshots[name] = 0;
  }

  const snapshotTitle = `${name}${separator}${snapshots[name]}`;
  (isImage ? SNAPSHOT_TITLES_IMAGE : SNAPSHOT_TITLES_TEXT).push(snapshotTitle);
  return snapshotTitle;
}

module.exports = {
  getSnapshotTitle,
  snapshotTitleIsUsed,
};
