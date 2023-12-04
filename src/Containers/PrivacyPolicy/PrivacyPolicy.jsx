import React from "react";
import { terms as Pp } from "../../Components/TermsConditions/TermsConditions";
import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
  const Alphabets = Array.from(Array(26)).map((_e, i) => i + 65)
    .map((x) => (String.fromCharCode(x).toString()).toLowerCase());
  return (
    <div className="p-6 flex flex-col flex-wrap mx-auto items-center justify-center max-w-7xl w-full mt-5 h-full mb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | Privacy policy`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
      <div className="w-full">
        <div className="w-full">
          <h1 className="text-5xl mb-8 font-semibold text-gray-800 text-center">Conditions générales d’utilisation</h1>
        </div>

        <div className="px-6">
          <div className="w-full mb-10">
            <h1 className="text-2xl font-semibold mb-2 text-gray-700">Sommaire :</h1>
            {Pp?.map((term, index) => (
              <h2 className="ml-6 text-lg font-semibold text-gray-500">
                {index + 1}. {term.title}
              </h2>))
            }
          </div>
          {Pp &&
            Pp?.map((term, index) => (
              <ul className="" key={index}>
                <section className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {index + 1}. {term.title}
                  </h3>
                  {
                    term?.context?.type === "list"
                      ? (
                        term?.context?.body?.map((_child, _i) =>
                          <>
                            <div className="px-2 flex flex-col gap-1 w-full pt-2">
                              {<h3 className="text-xl text-gray-700 font-semibold">
                                  {index + 1}.{_i + 1}.&nbsp; {_child?.subtitle || ''}
                                </h3>}
                                <h4 className=" ml-2 text-lg text-gray-700 font-semibold">
                                  {_child?.context || ""}
                                </h4>
                              <p className="text-lg text-gray-800">
                                {
                                  <>
                                  {
                                    _child?.body?.map((_item, ___i) =>
                                    <div className="px-2 flex flex-row gap-2 w-full pt-2">
                                      {
                                        _child?.context && ( 
                                          <h3 className="text-xl text-gray-700 font-semibold">
                                            {index + 1}.{_i + 1}.{___i + 1}
                                          </h3>
                                        )
                                      }
                                      <p className="text-lg text-gray-800">
                                        {_item}
                                      </p>
                                    </div>
                                  )
                                  }
                                  </>
                                }
                              </p>
                            </div>
                          </>
                        )
                      )
                      : (
                        term?.context?.body?.map((_child, _i) =>
                          <>
                            <div className="px-2 flex flex-row gap-2 w-full pt-2">
                              {<h3 className="text-xl text-gray-700 font-semibold">
                                  {index + 1}.{_i + 1}.
                                </h3>}
                              <p className="text-lg text-gray-800">
                                {_child}
                              </p>
                            </div>
                          </>
                        )
                      )
                  }
                </section>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}
