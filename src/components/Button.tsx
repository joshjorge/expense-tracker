interface Props {
  onAction?: () => void;
  clss: string;
  label?: string;
  tp?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}

function Button({ onAction, clss, label, tp, disabled }: Props) {
  return (
    <button onClick={onAction} type={tp} className={clss} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
