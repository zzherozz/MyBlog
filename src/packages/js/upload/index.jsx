import React, { useEffect } from 'react';
import JSZip from 'JSZip';
import styles from './index.module.less';
// 模拟后端返回 blob
export const Demo1 = () => {
  // 单文件上传
  const upload = () => {
    // 获取上传的input元素
    const uploadFileEle = document.querySelector('#uploadFile1');
    // 获取文件
    const files = uploadFileEle.files;
    console.log(uploadFileEle, 'uploadFileEle', files);
    let formData = new FormData();
    formData.append(fieldName, files[0]);
    // 进行请求
    // axios.post(url, formData)
  };
  // 多文件上传or文件夹上传
  const upload2 = () => {
    // 获取上传的input元素
    const uploadFileEle = document.querySelector('#uploadFile3');
    // 获取文件
    const files = uploadFileEle.files;
    console.log(uploadFileEle, 'uploadFileEle', files);

    let formData = new FormData();
    Object.values(files).forEach((file, i) => {
      formData.append('file' + i, file);
    });
    // 进行请求
    // axios.post(url, formData)
  };

  // 压缩文件
  function generateZipFile(zipName, files, options = { type: 'blob', compression: 'DEFLATE' }) {
    return new Promise((resolve, reject) => {
      // 创建 JSZip 对象
      const zip = new JSZip();
      Object.values(files).forEach((file, i) => {
        // 循环遍历 把文件添加到前面创建的 JSZip 对象中
        zip.file('file' + i, file);
      });
      // 生成 JSZip 文件
      zip.generateAsync(options).then(function (blob) {
        zipName = zipName || Date.now() + '.zip';
        const zipFile = new File([blob], zipName, {
          type: 'application/zip',
        });
        resolve(zipFile);
      });
    });
  }
  const upload4 = async () => {
    // 获取上传的input元素
    const uploadFileEle = document.querySelector('#uploadFile4');
    // 获取文件
    const fileList = uploadFileEle.files;
    if (!fileList.length) return;
    // 获取相对路径
    let webkitRelativePath = fileList[0].webkitRelativePath;
    // 获取文件夹的名字，用做zip包的名字
    let zipFileName = webkitRelativePath.split('/')[0] + '.zip';
    let zipFile = await generateZipFile(zipFileName, fileList);

    let formData = new FormData();
    console.log(zipFile, 'zipFile');
    formData.append('zipfile', zipFile);
    // 进行请求
    // axios.post(url, formData)
  };
  useEffect(() => {
    const dropAreaEle = document.querySelector('#dropArea');
    const imgPreviewEle = document.querySelector('#imagePreview');
    const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png)$/i;
    // 添加高亮样式
    function highlight(e) {
      dropAreaEle.classList.add(styles.highlighted);
    }

    // 移除高亮样式
    function unhighlight(e) {
      dropAreaEle.classList.remove(styles.highlighted);
    }
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = [...dt.files];
      files.forEach((file) => {
        previewImage(file, imgPreviewEle);
      });
      // 省略文件上传代码
    }

    function previewImage(file, container) {
      if (IMAGE_MIME_REGEX.test(file.type)) {
        const reader = new FileReader();
        reader.onload = function (e) {
          let img = document.createElement('img');
          img.src = e.target.result;
          container.append(img);
        };
        reader.readAsDataURL(file);
      }
    }
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropAreaEle.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });
    ['dragenter', 'dragover'].forEach((eventName) => {
      dropAreaEle.addEventListener(eventName, highlight, false);
    });
    ['dragleave', 'drop'].forEach((eventName) => {
      dropAreaEle.addEventListener(eventName, unhighlight, false);
    });
    dropAreaEle.addEventListener('drop', handleDrop, false);

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        dropAreaEle.removeEventListener(eventName, preventDefaults, false);
        document.body.removeEventListener(eventName, preventDefaults, false);
      });
      ['dragenter', 'dragover'].forEach((eventName) => {
        dropAreaEle.removeEventListener(eventName, highlight, false);
      });
      ['dragleave', 'drop'].forEach((eventName) => {
        dropAreaEle.removeEventListener(eventName, unhighlight, false);
      });
      dropAreaEle.removeEventListener('drop', handleDrop, false);
    };
  }, []);

  return (
    <>
      <div>
        单文件上传：
        <input id="uploadFile1" type="file" accept="image/*" />
        <span onClick={upload}>上传</span>
      </div>
      <div>
        多文件上传：
        <input id="uploadFile2" type="file" accept="image/*" multiple />
        <span onClick={upload2}>上传</span>
      </div>
      <div>
        文件夹上传：
        <input id="uploadFile3" type="file" accept="image/*" webkitdirectory="true" />
        <span onClick={upload2}>上传</span>
      </div>
      <div>
        文件夹压缩上传：
        <input id="uploadFile4" type="file" accept="image/*" webkitdirectory="true" />
        <span onClick={upload4}>上传</span>
      </div>
      <div>
        拖拽上传：
        <div id="dropArea" className={styles.warp}>
          <p>拖拽上传文件</p>
          <div id="imagePreview" className={styles.imagePreview}></div>
        </div>
      </div>
    </>
  );
};

export const FileReaderDemo = () => {
  const uploaderFile = (file) => {
    const oFileReader = new FileReader(); // 创建一个FileReader对象
    const oPreview = document.getElementById('file-img'); // 预览图
    oFileReader.onload = function (event) {
      oPreview.src = event.target.result; // 替换预览图的src
    };
    if (window.FileReader) {
      /*
          读取指定的Blob对象或File对象中的内容。
          当读取操作完成时，会自动尝试去调用onloadend事件。
          同时，result属性将包含一个data:URL表示读取的文件的内容。
           */
      oFileReader.readAsDataURL(file[0]);
    } else if (navigator.appName === 'Microsoft Internet Explorer') {
      // IE浏览器
      // IE10以下版本不支持FileReader()构造函数，利用滤镜兼容旧版本的IE
      oPreview.style.filter =
        'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
      oPreview.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = oUpload.value;
    }
  };
  return (
    <div className="file-reader-demo">
      <img id="file-img" />
      <input
        type="file"
        className="file-upload"
        accept="image/png,image/gif,image/jpeg,image/bmp"
        name="file"
        onChange={(e) => {
          uploaderFile(e.target.files);
        }}
      />
    </div>
  );
};
