interface PropTypes {
  fill?: string
  fillOpacity?: string
}

const ArchiveOut = ({ fill = "#7C58AA", fillOpacity = "0.8" }: PropTypes) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.1325 6.615L23.3838 2.86625C23.2679 2.74995 23.1301 2.65771 22.9785 2.59486C22.8268 2.532 22.6642 2.49976 22.5 2.5H7.5C7.33582 2.49976 7.17322 2.532 7.02155 2.59486C6.86988 2.65771 6.73214 2.74995 6.61625 2.86625L2.8675 6.615C2.75071 6.73084 2.65809 6.86873 2.595 7.02065C2.53192 7.17257 2.49963 7.3355 2.5 7.5V23.75C2.5 25.1288 3.62125 26.25 5 26.25H25C26.3788 26.25 27.5 25.1288 27.5 23.75V7.5C27.5004 7.3355 27.4681 7.17257 27.405 7.02065C27.3419 6.86873 27.2493 6.73084 27.1325 6.615ZM8.0175 5H21.9825L23.2325 6.25H6.7675L8.0175 5ZM5 23.75V8.75H25L25.0025 23.75H5Z" fill={fill} fillOpacity={fillOpacity}/>
      <path d="M8.75 17.5H12.5V21.25H17.5V17.5H21.25L15 11.25L8.75 17.5Z" fill="#7C58AA" fillOpacity={fillOpacity}/>
    </svg>
  )
}

export default ArchiveOut