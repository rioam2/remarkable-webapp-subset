import React from 'react';
import PropTypes from 'prop-types';
import SyncButton from './SyncButton';
import SyncSpinner from './SyncSpinner';
import ButtonWrapper from './ButtonWrapper';
import TopToolbarWrapper from './TopToolbarWrapper';
import BreadcrumbWrapper from './BreadcrumbWrapper';
import ToolbarButton from './components/ToolbarButton';
import remarkableAPI from '../../../../services/api/remarkable';
import syncspinner from './img/loadingspinner.svg';
import newfoldericon from './img/new_folder_icon.svg';

/* Define TopToolbar Component Interface: */
const ITopToolbarProps = {
  types: {
    currentFolder: PropTypes.string.isRequired,
    currentPath: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
      })
    ),
    handleSync: PropTypes.func.isRequired,
    syncState: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
  },
  defaults: {
    currentPath: [
      {
        name: 'My Files',
        id: ''
      }
    ]
  }
};

const TopToolbar = ({
  currentPath,
  handleSync,
  currentFolder,
  disabled,
  syncState
}) => {
  /* Assign TopToolbar Component Interface: */
  TopToolbar.propTypes = ITopToolbarProps.types;
  TopToolbar.defaultProps = ITopToolbarProps.defaults;

  return (
    <TopToolbarWrapper>
      <BreadcrumbWrapper>
        <ul>
          {/* Render Current Path Breadcrumb into an HTML list: */
          currentPath.map(folder => <li key={folder.id}>{folder.name}</li>)}
        </ul>
      </BreadcrumbWrapper>
      <ButtonWrapper>
        <ToolbarButton
          intent="New Folder"
          onClick={() =>
            /* Initiate new folder POST; 
			   Sync to update upon success: */
            remarkableAPI
              .createNewFolder(currentFolder)
              .then(() => handleSync())
              .catch(err => console.log(err))
          }
          svg={newfoldericon}
        />
        <SyncButton
          intent="Sync"
          disabled={disabled || syncState}
          onClick={() =>
            /* Call Sync Method only if not already sycning or disabled */
            !syncState && !disabled && handleSync()
          }
        >
          <SyncSpinner src={syncspinner} loading={syncState} />
        </SyncButton>
      </ButtonWrapper>
    </TopToolbarWrapper>
  );
};

export default TopToolbar;
