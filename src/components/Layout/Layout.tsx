interface Props extends React.PropsWithChildren {}

export default function Layout({ children }: Props) {
  return <div className='grid grid-cols-[360px_1fr]'>{children}</div>;
}
