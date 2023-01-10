import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import React, { useState, useRef, useEffect } from 'react';

import { Bounded } from "./Bounded";
import { Heading } from "./Heading";
import { HorizontalDivider } from "./HorizontalDivider";

const Profile = ({ name, description, profilePicture }) => {
  return (
    <div className="px-4">
      <div className="grid max-w-lg grid-cols-1 justify-items-center gap-8">
        <PrismicLink href="/" tabIndex="-1">
          <div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
            {prismicH.isFilled.image(profilePicture) && (
              <PrismicNextImage
                field={profilePicture}
                fill={true}
                className="object-cover"
              />
            )}
          </div>
        </PrismicLink>
        {(prismicH.isFilled.richText(name) ||
          prismicH.isFilled.richText(description)) && (
          <div className="grid grid-cols-1 gap-2 text-center">
            {prismicH.isFilled.richText(name) && (
              <Heading>
                <PrismicLink href="/">
                  <PrismicText field={name} />
                </PrismicLink>
              </Heading>
            )}
            {prismicH.isFilled.richText(description) && (
              <p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500">
                <PrismicText field={description} />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800">{children}</li>
  );
};

export const Header = ({
  withDivider = true,
  withProfile = false,
  navigation,
  settings,
}) => {
    // Count state
  // This will be displayed in the UI
  const [textThatChanges, setTextThatChanges] = useState('Industrial Designer');
  const textArray = ['Industrial Designer', 'Tinkerer', 'Carpenter', 'Mechanic', 'Developer'];
  let counter = 0;

  // Ref
  // This will be used to store the interval
  const intervalref = React.useRef();

  // Start the interval
  // This will be called when the user clicks on the start button
  const startInterval = () => {
    // if (intervalref.current !== null) return;
    intervalref.current = window.setInterval(() => {
      counter = counter + 1;
      if(counter == 5){
        counter = 0;
      }
      setTextThatChanges(textArray[counter]);
    }, 2000);
  };

  // Stop the interval
  // This will be called when the user clicks on the stop button
  const stopInterval = () => {
    if (intervalref.current) {
      window.clearInterval(intervalref.current);
      intervalref.current = null;
    }
  };
  // Use the useEffect hook to cleanup the interval when the component unmounts
  useEffect(() => {
    startInterval();
    // here's the cleanup function
    return () => {
      if (intervalref.current !== null) {
        window.clearInterval(intervalref.current);
      }
    };
  }, []);

  return (
    <Bounded as="header">
      <nav className="w-full flex items-center justify-between p-4 pt-8 max-w-screen-lg relative mx-auto">
    <div className="flex items-center flex-shrink-0 text-black mr-6">
      {/* <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> */}
      <PrismicLink href="/"><ul className="cursor-pointer">
        <li><span className="font-semibold text-xl tracking-tight font-Inter cursor-pointer">Annuai</span></li>
        <li><span className="font-light text-sm tracking-tight">{textThatChanges}</span></li>
      </ul>
      </PrismicLink>
    </div>
    <div className="block hidden">
      <button className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white">
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div className="w-full block flex-grow flex items-center w-auto">
      <div className="text-sm flex-grow">
        {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
          Work
        </a>
        <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
          About
        </a> */}
        {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white">
          Blog
        </a> */}
      </div>
      <div>
      {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 hover:text-black mr-4">
          Work
        </a> */}
        <a href="https://annu.me/about">
        <div className="inline-block mt-4 hover:text-mainred mr-4 cursor-pointer transition-all duration-150 ease-out">
          About<span className="hidden lg:inline-block">&nbsp;& Résumé</span>
        </div>
        </a>
        <a href="https://annu.me" className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white hover:bg-mainred mt-4 transition-all duration-150 ease-out">
          Home
        </a>
      </div>
    </div>
  </nav>
      {/* <div className="grid grid-cols-1 justify-items-center gap-20">
        <nav>
          <ul className="flex flex-wrap justify-center gap-10">
            <NavItem>
              <PrismicLink href="/">
                <PrismicText field={navigation.data.homepageLabel} />
              </PrismicLink>
            </NavItem>
            {navigation.data?.links.map((item) => (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </NavItem>
            ))}
          </ul>
        </nav>
        {withProfile && (
          <Profile
            name={settings.data.name}
            description={settings.data.description}
            profilePicture={settings.data.profilePicture}
          />
        )}
        {withDivider && <HorizontalDivider />}
      </div> */}
    </Bounded>
  );
};
