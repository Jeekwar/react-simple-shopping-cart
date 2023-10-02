import { ActionIcon, Image, rem } from "@mantine/core";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  return (
    <div className="tw-flex tw-w-full tw-fixed tw-z-10 tw-justify-between tw-items-center tw-px-4 md:tw-px-24 tw-pt-3 tw-mr-4 ">
      <Image src={"assets/img/Logo.png"} h={60} />
      <ActionIcon
        variant="subtle"
        aria-label="Settings"
        size={"lg"}
        color="yellow.6"
      >
        <AiOutlineShoppingCart
          style={{ width: "auto", height: rem(60) }}
          stroke={1.5}
        />
      </ActionIcon>
    </div>
  );
};

export default Header;
