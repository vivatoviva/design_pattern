// 通用结构

function Upload(uploadType) {
  this.uploadType = uploadType;
}

Upload.prototype.deFile = function (id) {
  uploadManager.setExternalState(id, this);
  //  根据文件大小提示是否要删除文件
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  } else if (window.confirm( '确定要删除该文件吗? ' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom);
  };
};

const UploadFactory = (function() {
  const cache = {};
  return {
    create(uploadType) {
      if (cache[uploadType]) {
        return cache[uploadType];
      }
      return cache[uploadType] = new Upload(uploadType);
    }
  }
})()

const uploadManager = (function () {
  const uploadDatabase = {};
  return {
    add(id, uploadType, fileName, fileSize) {
      const flyWeightObj = UploadFactory.create(uploadType);
      
      const dom = document.createElement('div');
      dom.innerHTML = '<span class="deFile">删除</span>';
      dom.querySelector('.deFile').onClick = function() {
        flyWeightObj.deFile(id);
      };
      uploadDatabase[id] = {
        fileName: fileName,
        fileSize,
        dom,
      };
      return flyWeightObj;
    },
    setExternalState(id, flyWeightObj) {
      const uploadData = uploadDatabase[id];
      for(let index in uploadData) {
        flyWeightObj[index] = uploadData[index];
      };
    }
  }
})()