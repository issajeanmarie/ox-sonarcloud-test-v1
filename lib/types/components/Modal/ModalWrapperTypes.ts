/**
 * ModalWrapperTypes
 * @author Patrick TUNEZERWANE (AWESOMITY LAB)
 * @authorEmail tunezepatrick@awesomity.rw
 * @since Aug 29 2022
 */

export type ModalWrapperTypes = {
  isModalVisible: boolean;
  isLoading: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  modalTitle: string;
  subTitle: string;
};
