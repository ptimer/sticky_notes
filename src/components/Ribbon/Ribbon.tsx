// styles
import styles from "./Ribbon.module.css";

type Position = "right-bottom";

type BaseColour = "dark-gray" | "bright-orange" | "green" | "red";

interface Props {
    position: Position;
    title: string;
    url: string;
    baseColour: BaseColour;
}

const Ribbon = (props: Props) => {
  const { position, title, url, baseColour } = props;

  const composePositionClassName = () => {
    switch(position) {
      case "right-bottom":
        return styles["right-bottom"];
      default:
        return styles["right-bottom"];
    }
  };

  const composeBaseColourClassName = () => {
    switch(baseColour) {
      case "dark-gray":
        return styles["dark-gray"];
      case "bright-orange":
        return styles["bright-orange"];
      case "green":
        return styles["green"];
      case "red":
        return styles["red"];
      default:
        return styles["dark-gray"];
    }
  }

  const composeClassName = () => {
    return `${styles.ribbon} ${composePositionClassName()} ${composeBaseColourClassName()} ${styles["fixed"]}`;
  }

  return (
    <a
      className={composeClassName()}
      href={url}
      data-ribbon={title}
      title={title}
      target="_blank"
      >{title}</a>
  )
}

export default Ribbon