const uploadFile = async data => {
  try {
    const { file, folderID } = data;
    const accessToken = localStorage.getItem('accessToken');

    var metadata = {
      name: file.name,
      parents: [folderID],
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('media', file);

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=webContentLink',
      {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
        body: form,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const downloadFile = async fileUrl => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const values = queryString.parse(fileUrl);
    const fileID = values['https://drive.google.com/uc?id'];
    let response;
    if (fileID) {
      response = await fetch('https://www.googleapis.com/drive/v3/files/' + fileID + '?alt=media', {
        method: 'GET',
        headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
      });
    } else {
      response = await fetch(fileUrl);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteFile = async fileID => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    let response = await fetch('https://www.googleapis.com/drive/v3/files/' + fileID, {
      method: 'DELETE',
      headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createFolder = async accessToken => {
  const checkFolders = await this.checkFolders(accessToken);
  if (checkFolders.audio) {
    return checkFolders;
  }
  const parentMetadata = {
    name: 'ESCUELA FILES',
    mimeType: 'application/vnd.google-apps.folder',
  };

  var parentForm = new FormData();
  parentForm.append('metadata', new Blob([JSON.stringify(parentMetadata)], { type: 'application/json' }));

  const parentResponse = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken,
      }),
      body: parentForm,
    }
  );
  const parentResponseData = await parentResponse.json();

  let folders = {};

  for (let keys in PROJECT_FILES_TYPES) {
    const subMetadata = {
      name: keys,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentResponseData.id],
    };

    var subForm = new FormData();
    subForm.append(
      'metadata',
      new Blob([JSON.stringify(subMetadata)], {
        type: 'application/json',
      })
    );

    const subResponse = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
      {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + accessToken,
        }),
        body: subForm,
      }
    );
    const subResponseData = await subResponse.json();
    folders = { ...folders, [keys]: subResponseData.id };
  }

  await fetch('https://www.googleapis.com/drive/v3/files/' + parentResponseData.id + '/permissions', {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + accessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: '{"role":"reader","type":"anyone"}',
  });
  return folders;
};

const checkFolders = async accessToken => {
  const responseFolders = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${'mimeType=\'application/vnd.google-apps.folder\' and trashed = false '}&fields=${' files(id, name, parents)'}`,
    {
      method: 'GET',
      headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
    }
  );
  let folders = {};
  if (responseFolders.status === 200) {
    const responseFoldersData = await responseFolders.json();

    const files = responseFoldersData.files;
    const escuelaFolder = await files.find(file => file.name === 'ESCUELA FILES');
    if (escuelaFolder) {
      const foldersArray = await files.filter(file => file.parents[0] === escuelaFolder.id);

      for (let folder of foldersArray) {
        folders = { ...folders, [folder.name]: folder.id };
      }
    }
  }

  return folders;
};

export {
  uploadFile,
  createFolder,
  checkFolders,
  deleteFile,
  downloadFile,
};
