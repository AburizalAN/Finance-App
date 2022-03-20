interface PropTypes {
  fill?: string
  fillOpacity?: string
}

const Add = ({ fill = "white", fillOpacity = "0.8" }: PropTypes) => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.0044 15.9955V8.96428H15.9955V15.9955H8.96426V18.0045H15.9955V25.0357H18.0044V18.0045H25.0357V15.9955H18.0044Z" fill={fill}/>
    </svg>
  )
}

export default Add