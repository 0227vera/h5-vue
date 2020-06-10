import EXIF from './exif-js'
/**
 * ios上传图片会旋转 需要处理
 * @param file 上传的图片
 * @param cb 生成正确图片之后的回调 参数为图片的blob和name
 */
export default function rotateImg (file, cb) {
  let Orientation = 0
  // 获取图片的Orientation
  EXIF.getData(file, function () {
    Orientation = EXIF.getTag(file, 'Orientation')
  })
  const reader = new FileReader()
  const image = new Image()
  reader.onload = function () {
    if (typeof reader.result === 'string') {
      image.src = reader.result
    }
    image.onload = function () {
      let imgWidth = image.width
      let imgHeight = image.height
      if (imgWidth > imgHeight && imgWidth > 750) {
        imgWidth = 750
        imgHeight = Math.ceil(750 * image.height / image.width)
      } else if (imgWidth < imgHeight && imgHeight > 1334) {
        imgWidth = Math.ceil(1334 * image.width / image.height)
        imgHeight = 1334
      }
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // ctx可能为null 不这么写ts会报错
      if (ctx) {
        if (Orientation && Orientation !== 1) {
          switch (Orientation) {
            case 6: // 顺时针90°
              canvas.width = imgHeight
              canvas.height = imgWidth
              ctx.rotate(Math.PI / 2)
              ctx.drawImage(image, 0, -imgHeight, imgWidth, imgHeight)
              break
            case 3: // 180°
              canvas.width = imgWidth
              canvas.height = imgHeight
              ctx.rotate(Math.PI)
              ctx.drawImage(image, -imgWidth, -imgHeight, imgWidth, imgHeight)
              break
            case 8: // 逆时针90°
              canvas.width = imgHeight
              canvas.height = imgWidth
              ctx.rotate(3 * Math.PI / 2)
              ctx.drawImage(image, -imgWidth, 0, imgWidth, imgHeight)
              break
          }
        } else {
          canvas.width = imgWidth
          canvas.height = imgHeight
          ctx.drawImage(image, 0, 0, imgWidth, imgHeight)
        }
        canvas.toBlob(function (blob) {
          cb(blob, file.name)
        }, file.type || 'image/png', 1)
      }
    }
  }
  reader.readAsDataURL(file)
}
