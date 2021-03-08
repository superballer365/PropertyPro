import React from "react";
import { withHeader } from "../Components/Header/Header";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

export interface ILoadingPageProps extends IBaseLoadingPageProps {
  showHeader?: boolean;
}

export default function LoadingPage({ text, showHeader }: ILoadingPageProps) {
  if (showHeader) return <LoadingPageWithHeader text={text} />;
  else return <BaseLoadingPage text={text} />;
}

export interface IBaseLoadingPageProps {
  text?: string;
}

function BaseLoadingPage({ text }: IBaseLoadingPageProps) {
  return <LoadingSpinner text={text} />;
}

const LoadingPageWithHeader = withHeader(BaseLoadingPage);
