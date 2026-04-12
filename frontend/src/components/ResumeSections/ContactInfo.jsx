import React from 'react'

const ContactInfo = ( { icon, iconBG, value }) => {
  return (
    <div className='flex items-center gap-3'>
      <div 
        className='w-7.5 h-7.5 flex items-center justify-center rounded-full'
        style={{backgroundColor: iconBG}}
      >
        {icon}
      </div>
      <p className='flex-1 text-[12px] font-medium break-all'>{value}</p>
    </div>
  )
}

export default ContactInfo
