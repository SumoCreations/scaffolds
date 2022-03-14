import React from 'react'
import { Button, ButtonGroup } from '..'
import { Modal, ModalProps } from './Modal'

export interface DialogProps extends ModalProps {
  cancelLabel?: string
  confirmLabel?: string
  message: string
  onCancel?: () => void
  onConfirm: () => void
}

const MESSAGE_STYLES = 'text-md px-2 mb-4'

export const Dialog: React.FC<DialogProps> = ({
  children,
  message,
  cancelLabel,
  confirmLabel,
  onConfirm: handleConfirm,
  onCancel: handleCancel,
  ...modalProps
}) => {
  console.log('Dialog.render', handleCancel)
  return (
    <Modal {...modalProps}>
      <p className={MESSAGE_STYLES}>{message}</p>
      <ButtonGroup direction="row" grow>
        {handleCancel ? (
          <Button
            appearance="secondary"
            className="w-full flex-grow"
            onClick={handleCancel}
          >
            {cancelLabel ?? 'Cancel'}
          </Button>
        ) : null}
        <Button
          appearance="primary"
          className="w-full flex-grow"
          onClick={handleConfirm}
        >
          {confirmLabel ?? 'Confirm'}
        </Button>
      </ButtonGroup>
    </Modal>
  )
}
