import React, { FC,Suspense } from 'react'

import {Modal} from 'antd'

const UsernameModal:FC<any> = ({isOpen,toggle}) => {
  return (
    <Suspense>
    <Modal
    open={isOpen}
    onCancel={()=>{
        toggle(false)
    }}
    title={'Elegir nombre de usuario'}
    okButtonProps={{
        hidden:true
    }}
    cancelButtonProps={{
        hidden:true
    }}
    >
<div>
    Hola
</div>
    </Modal>
        </Suspense>
  )
}

export default UsernameModal