// addded for support typescript importing .module.(scss/css)
declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}
declare module '*.module.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.jpg';
