import { useRef } from 'react';
import { Book, FileText, Video, Monitor, Clipboard, Archive, Youtube, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import logoImage from '../../imports/Screenshot_2026-06-03_at_14.17.43.png';

export default function Home() {
  const resourcesRef = useRef<HTMLDivElement>(null);

  const scrollToResources = () => {
    resourcesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section style={{ backgroundColor: 'var(--black)' }} className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Basketball Court SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 886 572"
          preserveAspectRatio="xMidYMid slice"
        >
          <g
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* ... SVG content same as original App.tsx ... */}
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M33.500000,480.500000 
        C35.666668,480.333313 37.833019,480.026917 40.000050,480.022064 
        C57.499962,479.982666 75.000298,479.933563 92.499939,480.012787 
        C140.002213,480.227814 182.237152,464.847900 219.394699,435.865021 
        C241.969513,418.256683 260.093414,396.329590 273.349945,370.921722 
        C284.841278,348.897034 292.355530,325.464142 295.164032,300.518463 
        C296.877228,285.301605 297.175659,270.112976 295.792419,255.019028 
        C294.306915,238.809250 290.672424,222.901016 285.062012,207.477448 
        C278.153992,188.486740 269.061890,170.692719 256.962158,154.528320 
        C242.353271,135.011871 225.053192,118.352814 204.553467,104.918427 
        C182.814163,90.671700 159.447922,80.707840 134.004425,75.478477 
        C118.321472,72.255180 102.503029,70.838455 86.499741,70.967819 
        C69.000885,71.109283 51.500000,71.000000 34.000000,71.000000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M863.000000,71.000000 
        C844.666687,71.000000 826.333130,71.049309 808.000061,70.990326 
        C761.643555,70.841179 719.665833,84.236984 682.537109,112.049576 
        C655.826538,132.058044 635.216675,157.080032 620.847778,187.427917 
        C612.559082,204.934006 606.847717,222.996140 603.417603,241.985107 
        C600.327026,259.093842 599.443787,276.316986 601.176575,293.482178 
        C603.134155,312.874237 607.586548,331.716827 614.754150,350.095886 
        C622.666626,370.384827 633.551025,388.685944 647.094788,405.423279 
        C661.831360,423.634644 679.334106,438.998138 699.544495,450.924652 
        C721.408691,463.827148 744.734009,473.022644 769.986572,477.083588 
        C780.620300,478.793610 791.235291,480.018707 802.000000,480.005981 
        C820.333313,479.984314 838.666748,479.983429 856.999939,480.022034 
        C859.166992,480.026581 861.333313,480.333374 863.500000,480.500031 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M448.500000,25.500000 
        C446.585999,23.905106 444.296173,23.992218 442.000000,23.992363 
        C307.666656,24.000912 173.333328,23.998623 39.000000,24.004278 
        C32.629810,24.004547 32.501873,24.158791 32.500610,30.500000 
        C32.498417,41.500000 32.500000,52.500000 32.500000,63.500000 
        C32.500000,111.000000 32.500000,158.500000 32.500000,206.000000 
        C32.500000,247.000000 32.500000,288.000000 32.500000,329.000000 
        C32.500000,377.333344 32.500000,425.666656 32.500000,474.000000 
        C32.500000,489.833344 32.489185,505.666656 32.506363,521.500000 
        C32.511757,526.473633 32.941536,526.870789 38.000057,526.997681 
        C38.666309,527.014343 39.333332,527.000000 40.000000,527.000000 
        C173.666672,527.000000 307.333344,527.000000 441.000000,527.000000 
        C579.666687,527.000000 718.333313,527.000000 857.000000,527.000000 
        C858.500000,527.000000 860.067932,527.275635 861.482056,526.927124 
        C863.090576,526.530640 864.558655,525.804077 864.543762,523.499695 
        C864.455078,509.833649 864.733337,496.159454 864.311218,482.505829 
        C864.222351,479.632385 864.606201,476.835419 864.597168,473.999695 
        C864.457825,430.333466 864.500000,386.666656 864.500000,343.000000 
        C864.500000,302.833344 864.500000,262.666656 864.500000,222.500000 
        C864.500000,174.333328 864.500000,126.166664 864.500000,78.000000 
        C864.500000,61.833332 864.510620,45.666656 864.493652,29.500008 
        C864.488403,24.526396 864.058472,24.129143 858.999939,24.002293 
        C858.333679,23.985582 857.666687,24.000000 857.000000,24.000000 
        C723.333313,24.000000 589.666687,23.999496 456.000000,24.004057 
        C453.623688,24.004137 451.197205,23.713802 449.000000,25.000000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
      M448.500000,26.000000 
        C448.500000,134.500000 448.500000,243.000000 448.500000,351.500000 
        C481.424469,354.768097 520.576477,326.561066 524.863037,284.486053 
        C529.722229,236.789902 494.665466,201.688354 453.992065,199.125977 
        C409.196198,196.303894 376.761749,229.424805 372.462250,266.495636 
        C366.683960,316.317017 408.184113,353.645508 448.500000,351.979340 
        C448.500000,409.832367 448.500000,467.666199 448.500000,525.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
      M863.000000,336.500000 
        C812.333313,336.500000 761.666687,336.509399 711.000000,336.489899 
        C703.333313,336.486969 695.755615,335.524750 687.971130,336.126099 
        C682.024536,336.585449 675.624817,336.814056 669.474609,335.090515 
        C663.205933,333.333771 657.205688,331.254761 651.462341,328.067871 
        C628.585083,315.373474 615.857300,286.990448 622.907776,260.975006 
        C629.486206,236.701080 645.544983,222.675583 669.015381,216.054596 
        C671.065918,215.476135 673.330750,215.579315 675.500488,215.516006 
        C682.665894,215.306885 689.833313,215.052567 697.000000,215.052200 
        C700.178711,215.052048 703.103516,215.589798 705.170593,218.893250 
        C706.151184,220.460327 708.241638,222.001282 710.500000,222.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
      M183.500000,223.500000 
        C187.334839,223.336044 190.250092,221.016495 192.347260,218.378571 
        C194.122513,216.145554 196.309021,214.956848 198.486450,215.151489 
        C203.823273,215.628616 209.209518,214.387238 214.528198,215.900909 
        C216.180283,216.371094 218.170319,215.490479 219.999420,215.528305 
        C232.868591,215.794342 244.140732,220.660995 253.928314,228.588501 
        C263.584106,236.409271 270.535828,246.488663 273.927307,258.520477 
        C279.505249,278.308899 276.085846,296.728546 263.425385,312.941742 
        C252.488327,326.947937 237.879440,334.892090 219.994583,335.904419 
        C213.195435,336.289246 206.228378,337.661133 199.524170,335.427429 
        C195.859451,334.206421 192.939041,336.600250 189.499756,336.591217 
        C139.000107,336.458618 88.500000,336.503845 38.000011,336.479065 
        C36.666595,336.478394 35.333336,336.166656 34.000000,336.000000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M192.500000,217.000000 
        C189.607651,215.030289 186.324997,214.987961 183.000000,214.989029 
        C133.333328,215.004913 83.666664,215.000000 34.000000,215.000000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M863.000000,215.000000 
        C813.333313,215.000000 763.666687,215.011841 714.000000,214.971893 
        C710.880066,214.969376 707.878418,215.270691 705.000000,216.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
      M681.500000,217.000000 
        C681.500000,256.166656 681.500000,295.333344 681.500000,334.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
      M215.500000,217.000000 
        C215.500000,256.166656 215.500000,295.333344 215.500000,334.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
              d="
      M841.500000,275.000000 
        C839.894226,270.723633 838.666382,266.458160 834.055420,263.900116 
        C826.892456,259.926300 820.225525,261.017731 815.476868,267.483032 
        C810.348633,274.465118 811.960938,281.079895 818.473145,286.532074 
        C826.725586,293.441254 837.791260,288.504730 840.500061,279.000031 
        C840.832703,277.833160 841.166687,276.666687 841.500061,275.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
              d="
      M55.500000,276.000000 
        C57.543991,279.850800 58.474911,284.355438 62.486534,287.020264 
        C70.092369,292.072662 77.428810,289.535034 81.952995,283.464966 
        C86.774017,276.996674 84.867867,269.613434 78.594093,264.387054 
        C71.593529,258.555176 60.870213,261.954987 57.004730,271.501923 
        C56.470478,272.821381 55.999996,274.166656 55.499996,275.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
              d="
      M46.500000,248.500000 
        C47.628777,254.138367 46.731144,259.835907 46.989876,265.500458 
        C47.128059,268.525879 46.650181,271.580902 47.971928,274.512665 
        C49.155056,277.136932 46.698147,279.281067 46.863743,282.008270 
        C47.277130,288.816528 47.000000,295.666656 47.000000,302.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
              d="
      M850.000000,248.500000 
        C850.000000,254.833328 850.000000,261.166656 850.000000,267.500000 
        C850.000000,275.079224 850.000000,275.079224 842.000000,275.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
              d="
      M848.500000,276.000000 
        C850.256165,278.064148 850.000366,280.559265 850.000183,283.000000 
        C849.999695,289.500000 850.000000,296.000000 850.000000,302.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M156.000000,263.500000 
        C156.412018,268.187347 153.990967,272.773499 155.500000,277.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M741.500000,284.500000 
        C740.500000,288.500000 739.500000,292.500000 738.500000,296.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M720.500000,320.500000 
        C720.582031,324.582031 715.936646,323.910278 714.457275,326.475342 
        C714.074463,327.139069 713.166687,327.500000 712.500000,328.000000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M734.000000,304.500000 
        C732.704407,308.399536 730.602295,311.774811 727.500000,314.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M728.500000,238.500000 
        C727.531616,233.990433 723.267700,232.410217 720.500000,229.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M741.500000,263.500000 
        C741.393555,268.166656 742.770813,272.833344 741.500000,277.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M175.500000,322.000000 
        C179.461685,323.199982 182.170654,326.327209 185.500000,328.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M733.500000,243.500000 
        C735.333313,247.833328 737.166687,252.166672 739.000000,256.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M176.000000,230.250000 
        C173.807007,231.279312 172.034668,232.859222 171.055344,235.025024 
        C170.234756,236.839798 168.843826,236.413391 167.500000,236.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.000000"
              d="
      M163.000000,304.500000 
        C164.078949,308.540344 166.974716,311.399780 169.500000,314.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M163.500000,243.500000 
        C162.684967,247.854843 159.872055,251.377243 158.500000,255.500000 
      "/>
            <path fill="none" opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
      M155.500015,284.500000 
        C156.666672,288.333344 157.833344,292.166656 159.000015,296.000000 
      "/>
          </g>
        </svg>
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">


          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: '-1px' }}
            className="text-[52px] md:text-[96px] text-white uppercase leading-[1.0] mb-5">
            ONE STOP TO "RULE" THEM ALL
          </h2>

          <p style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-[18px] text-[#CCCCCC] max-w-[560px] mx-auto mb-8">
            The definitive platform for basketball referees to sharpen their officiating edge
          </p>

          <button
            onClick={scrollToResources}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '3px', backgroundColor: 'var(--orange)' }}
            className="px-10 py-4 text-white uppercase text-[14px] hover:opacity-90 transition-opacity">
            EXPLORE RESOURCES
          </button>
        </div>

        {/* Bottom Orange Border */}
        <div style={{ backgroundColor: 'var(--orange)' }} className="absolute bottom-0 left-0 right-0 h-[3px]"></div>
      </section>

      {/* WAYS WE HELP YOU IMPROVE */}
      <section id="about" style={{ backgroundColor: 'var(--off-white)' }} className="relative">
        <div style={{ backgroundColor: 'var(--orange)' }} className="h-[2px] w-full"></div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px] py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column */}
            <div>
              <div className="flex items-start gap-4 mb-8">
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: 'var(--orange)' }}
                  className="text-[180px] leading-none">
                  6
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: 'var(--dark-text)' }}
                  className="text-[48px] uppercase leading-tight pt-8">
                  <div>WAYS WE HELP</div>
                  <div>YOU IMPROVE</div>
                </div>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8 }}
                className="text-[16px] text-[#555555] mb-12">
                Referee Vision is India's premier platform dedicated to basketball officiating excellence. We provide comprehensive resources for referees at all levels to enhance their skills, stay current with rule changes, and connect with the officiating community.
              </p>

              {/* Basketball SVG */}
              <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1276" width="100%" height="auto"
                  preserveAspectRatio="xMidYMid meet">
                  <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017
                  </metadata>
                  <g transform="translate(0,1276) scale(0.1,-0.1)" fill="var(--orange)" stroke="none">
                    <path d="M6095 12754 c-655 -42 -1166 -139 -1744 -331 -444 -147 -985 -405
                    -1366 -651 -91 -58 -93 -58 95 -37 191 22 650 30 840 16 641 -48 1163 -190
                    1735 -471 249 -123 479 -261 885 -532 191 -127 360 -232 430 -266 108 -53 119
                    -57 190 -57 73 0 77 1 154 50 44 28 127 95 184 149 187 180 303 388 358 646
                    25 118 26 372 1 490 -64 304 -227 611 -469 883 l-43 48 -115 15 c-247 32 -448
                    45 -755 48 -176 2 -347 2 -380 0z"/>
                    <path d="M7630 12635 c0 -3 22 -38 48 -78 208 -310 348 -642 393 -932 18 -113
                    15 -322 -5 -434 -58 -326 -246 -648 -586 -1003 -61 -65 -110 -121 -108 -126 2
                    -6 858 -808 944 -884 21 -18 23 -17 300 204 1091 868 1493 1147 2067 1435 103
                    52 187 100 187 107 0 22 -213 221 -410 382 -811 665 -1775 1123 -2797 1329
                    -18 4 -33 4 -33 0z"/>
                    <path d="M3110 11619 c-159 -15 -255 -30 -365 -56 -107 -25 -113 -28 -210
                    -102 -1320 -999 -2211 -2492 -2460 -4120 -29 -194 -38 -283 -25 -256 5 11 24
                    59 43 106 207 523 788 945 1767 1283 536 186 1045 312 2333 581 1168 243 1541
                    338 1917 487 315 125 532 269 623 415 32 51 67 152 67 194 0 121 -278 400
                    -595 597 -605 374 -1369 670 -2073 801 -376 71 -751 96 -1022 70z"/>
                    <path d="M10870 10627 c-751 -483 -1593 -1102 -2163 -1591 -83 -71 -126 -114
                    -122 -124 10 -28 820 -1041 833 -1041 7 -1 70 28 141 63 409 206 826 336 1199
                    377 142 15 423 7 552 -16 531 -95 970 -413 1349 -980 61 -92 91 -130 87 -110
                    -3 17 -13 77 -21 135 -89 612 -291 1250 -580 1835 -205 416 -414 752 -684
                    1100 -152 196 -387 465 -406 465 -5 -1 -89 -51 -185 -113z"/>
                    <path d="M7155 9859 c-14 -22 -215 -176 -320 -244 -399 -261 -908 -465 -1610
                    -645 -315 -81 -585 -140 -1306 -285 -1046 -211 -1440 -305 -1894 -452 -972
                    -315 -1594 -752 -1947 -1368 -61 -106 -63 -112 -70 -200 -10 -141 -9 -434 2
                    -636 61 -1088 378 -2104 947 -3027 183 -297 536 -769 565 -756 7 3 101 114
                    208 247 1837 2275 3838 4331 6063 6227 152 129 276 240 277 245 0 7 -897 903
                    -907 905 -1 0 -5 -5 -8 -11z"/>
                    <path d="M8124 8517 c-1868 -1413 -3679 -3206 -5930 -5872 -417 -495 -504
                    -599 -504 -606 0 -4 78 -85 172 -181 994 -998 2273 -1639 3648 -1827 277 -38
                    246 -39 363 18 317 156 594 420 823 784 200 317 417 846 554 1352 99 363 186
                    742 290 1255 11 52 60 295 109 540 211 1043 307 1438 476 1955 36 109 143 393
                    187 495 233 534 515 930 853 1195 28 22 52 40 54 42 6 4 -830 1028 -842 1030
                    -7 2 -120 -79 -253 -180z"/>
                    <path d="M10580 8093 c-19 -2 -83 -13 -142 -23 -283 -53 -506 -170 -647 -340
                    -61 -73 -65 -106 -25 -208 44 -111 82 -175 373 -632 216 -338 352 -562 476
                    -780 700 -1233 956 -2343 779 -3380 -25 -145 -80 -377 -108 -457 -8 -24 -12
                    -43 -8 -42 9 0 179 214 274 344 668 913 1073 1937 1203 3040 40 347 55 771 36
                    1069 l-12 189 -41 81 c-308 614 -942 1039 -1688 1132 -102 13 -377 17 -470 7z"/>
                    <path d="M9255 7311 c-362 -131 -648 -562 -880 -1326 -124 -410 -216 -798
                    -415 -1760 -243 -1174 -342 -1596 -491 -2095 -214 -719 -467 -1273 -756 -1658
                    -102 -136 -264 -308 -378 -400 l-80 -65 305 6 c954 18 1859 245 2725 682 576
                    291 1051 627 1537 1086 144 137 147 141 198 245 95 194 158 419 196 694 22
                    153 25 572 6 760 -58 575 -219 1194 -472 1820 -324 800 -764 1531 -1138 1891
                    -108 105 -111 107 -180 123 -89 20 -115 20 -177 -3z"/>
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {[
                { num: 1, title: 'Physical & Mental Books', desc: 'Comprehensive guides for referee fitness, nutrition, and psychology' },
                { num: 2, title: 'Rule Books', desc: 'Latest FIBA and BFI officiating rules and official interpretations' },
                { num: 3, title: 'Videos on Rules', desc: 'Visual explanations and demonstrations of rule mechanics' },
                { num: 4, title: 'Webinars on Rules', desc: 'Live sessions with expert referees and instructors' },
                { num: 5, title: 'Coaches', desc: 'Dedicated coaching manuals, strategy guides, and officiating perspectives for coaches' },
                { num: 6, title: 'Vault', desc: 'A vast collection of basketball magazines, historical materials, and rare officiating resources' }
              ].map((item, idx) => (
                <div key={item.num}>
                  <div className="flex items-start gap-4">
                    <div style={{ backgroundColor: 'var(--orange)' }} className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                        className="text-white text-[28px]">
                        {item.num}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: 'var(--dark-text)' }}
                        className="text-[17px] mb-1">
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[14px] text-[#777777]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {idx < 5 && <div style={{ backgroundColor: '#E0DDD8' }} className="h-[1px] mt-6"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS & RESOURCES */}
      <section ref={resourcesRef} style={{ backgroundColor: 'var(--pure-white)' }} className="relative">
        <div style={{ backgroundColor: 'var(--orange)' }} className="h-[3px] w-full"></div>
        <div style={{ backgroundColor: '#E8E8E8' }} className="h-[1px] w-full"></div>

        <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-12 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: 'var(--dark-text)' }}
              className="text-[42px] md:text-[56px] uppercase mb-4">
              PROGRAMS & RESOURCES
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-[16px] text-[#777777] max-w-[620px] mx-auto">
              Explore a range of programs, services, and resources designed to support and enhance every aspect of your officiating journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {[
              { icon: <Book className="w-6 h-6" />, title: 'PHYSICAL & MENTAL BOOKS', desc: 'Comprehensive guides covering referee fitness, nutrition, psychology, and peak performance' },
              { icon: <FileText className="w-6 h-6" />, title: 'RULE BOOKS', desc: 'Latest FIBA rules, BFI regulations, and official interpretations for Indian referees' },
              { icon: <Video className="w-6 h-6" />, title: 'VIDEOS ON RULES', desc: 'Visual rule explanations and mechanics demonstrations for practical learning' },
              { icon: <Monitor className="w-6 h-6" />, title: 'WEBINARS ON RULES', desc: 'Live and recorded expert sessions for ongoing referee education' },
              { icon: <Clipboard className="w-6 h-6" />, title: 'COACHES', desc: 'Dedicated coaching manuals, strategy guides, and officiating perspectives designed for coaches' },
              { icon: <Archive className="w-6 h-6" />, title: 'VAULT', desc: 'A vast collection of basketball magazines, historical materials, and rare officiating resources' }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E2E2] p-9 group hover:border-[var(--orange)] transition-all duration-200"
              >
                <div className="w-[52px] h-[52px] rounded-full bg-[#F5F2EE] flex items-center justify-center mb-4 text-[#888888] group-hover:text-[var(--orange)] transition-colors">
                  {card.icon}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: 'var(--dark-text)' }}
                  className="text-[22px] uppercase mb-3 group-hover:text-[var(--orange)] transition-colors">
                  {card.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}
                  className="text-[14px] text-[#777777]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FROM THE DESK */}
      <section style={{ backgroundColor: 'var(--off-white)' }} className="relative pt-20 pb-32 md:pt-30 md:pb-50 overflow-hidden">
        <div style={{ backgroundColor: 'var(--orange)' }} className="h-[3px] w-full absolute top-0"></div>

        {/* Court Arc Decoration */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 684" width="600px" height="600px" style={{ position: "absolute", left: "-180px", top: "-20px", opacity: 0.08, pointerEvents: "none", }}>
          <g transform="translate(0,684) rotate(-90)" stroke="var(--orange)" strokeLinecap="round" strokeLinejoin="round">
            <path fill="none" opacity="1" strokeWidth="8.000000"
              d="
          M666.500000,2.500000 
            C664.707581,3.471720 663.602173,4.661573 663.434570,6.995301 
            C662.344482,22.178022 659.458618,37.074585 656.637756,52.025993 
            C650.089478,86.734070 639.022705,119.952972 624.390503,151.949936 
            C610.319824,182.719086 592.598083,211.341965 571.025757,237.521210 
            C557.927673,253.416504 543.797668,268.299835 527.962036,281.454285 
            C506.135773,299.584991 482.608887,314.987732 456.574341,326.665741 
            C440.780243,333.750336 424.587494,339.374115 407.978302,343.920776 
            C400.774200,345.892853 393.357727,347.138672 385.988464,348.434357 
            C382.875458,348.981689 379.768738,348.207397 377.000000,346.500000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="8.000000"
              d="
          M25.500000,4.750000 
            C26.833334,13.833333 28.256712,22.904604 29.475552,32.003277 
            C30.784605,41.775406 32.984669,51.365978 34.976479,61.004860 
            C38.841953,79.710938 44.370338,97.959763 50.615601,115.959892 
            C54.871960,128.227600 60.005268,140.202728 65.485649,152.006668 
            C78.189278,179.368347 93.560226,205.113220 112.006256,228.995163 
            C140.636215,266.062164 175.052475,296.342712 216.472031,318.552155 
            C237.453995,329.802826 259.488098,338.126709 282.504944,343.980499 
            C286.970459,345.116211 291.497223,346.012787 296.000854,346.996185 
            C299.932159,347.854645 303.830505,348.116241 307.496399,345.993805 
            C310.015076,344.535614 312.900543,345.357452 314.935577,346.162781 
            C329.135040,351.781586 343.743073,351.711243 358.493134,349.942749 
            C363.869110,349.298187 369.167450,348.004272 374.498993,346.994659 
            C375.173035,346.867004 376.170959,346.889465 376.449799,346.466888 
            C381.406647,338.955475 390.135895,336.254822 396.571564,330.581177 
            C414.439606,314.828796 423.743927,294.887482 424.141937,271.493896 
            C424.312714,261.458954 423.947418,251.025864 421.514862,240.996399 
            C421.238373,239.856354 420.586914,238.190414 421.092010,237.575592 
            C425.017181,232.797607 423.398407,227.218430 423.428436,221.999588 
            C423.582855,195.167145 423.500000,168.333328 423.500000,141.500000 
            C423.500000,121.333336 423.539551,101.166519 423.464081,81.000137 
            C423.450256,77.304878 424.003784,73.992630 427.000000,71.500000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="8.000000"
              d="
          M420.500000,238.000000 
            C417.505920,236.518723 416.095703,233.748718 414.454865,231.027206 
            C405.584808,216.315063 393.883636,204.670975 378.013885,197.469406 
            C362.621460,190.484467 346.720001,188.113739 329.994171,190.965744 
            C314.579956,193.594101 301.191620,200.168304 289.469635,210.465454 
            C282.457214,216.625534 276.987579,223.913788 272.530304,232.016678 
            C271.080017,234.653198 269.336029,236.836044 266.500000,238.000000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="7.000000"
              d="
          M423.000000,268.500000 
            C420.833344,268.666687 418.666748,268.977661 416.500000,268.978851 
            C366.000000,269.006195 315.500000,269.000000 265.000000,269.000000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="8.000000"
              d="
          M260.000000,72.500000 
            C262.763611,74.878967 263.542969,77.937065 263.536713,81.500061 
            C263.475647,116.166618 263.500000,150.833328 263.500000,185.500000 
            C263.500000,200.166672 263.500000,214.833328 263.500000,229.500000 
            C263.500000,230.333328 263.190216,231.341843 263.547272,231.973267 
            C267.759857,239.423309 264.157104,247.001175 263.942261,254.498352 
            C263.798706,259.507050 263.848236,264.563446 263.619263,269.482269 
            C263.387146,274.469147 263.732727,279.148499 264.434967,284.009399 
            C266.707703,299.740112 273.817780,313.010010 284.528198,324.473663 
            C289.242371,329.519379 294.393616,334.042358 300.429047,337.619690 
            C303.391846,339.375763 306.687378,341.312622 308.000000,345.000000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="8.000000"
              d="
          M263.500000,4.500000 
            C263.500000,22.666666 263.456635,40.833523 263.536102,58.999844 
            C263.552277,62.695251 262.996216,66.007370 260.000000,68.500000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="8.000000"
              d="
          M423.500000,4.500000 
            C423.500000,22.666666 423.543365,40.833523 423.463898,58.999844 
            C423.447723,62.695251 424.003784,66.007370 427.000000,68.500000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
          M264.500000,242.500000 
            C259.666656,242.666672 254.833328,242.833328 250.000000,243.000000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.000000"
              d="
          M262.500000,134.000000 
            C258.333344,134.000000 254.166672,134.000000 250.000000,134.000000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
          M435.500000,246.499985 
            C431.333344,246.333328 427.166656,246.166656 423.000000,245.999985 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
          M436.500000,135.500000 
            C432.500000,135.500000 428.500000,135.500000 424.500000,135.500000 
          "/>
            <path fill="none" opacity="1.000000" stroke="var(--orange)" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.000000"
              d="
          M262.000000,191.000000 
            C258.194855,190.184891 254.336655,190.590225 250.500000,190.500000 
          "/>
          </g>
        </svg>


        <div className="max-w-[780px] mx-auto px-8 relative z-10">
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '4px' }}
            className="text-[12px] text-[#AAAAAA] uppercase mb-6">
            FROM THE DESK
          </p>

          <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.9 }}
            className="text-[17px] text-[#333333] mb-10">
            I thank FIBA Referee Department, Youtube channels and all others for providing valuable study materials. This platform serves as a centralized hub to help basketball referees across India access quality resources, stay updated with rule changes, and continuously improve their officiating skills. Our goal is to elevate the standard of basketball officiating in the country through education, collaboration, and dedication to excellence.
          </p>

          <div style={{ backgroundColor: '#DDDDDD' }} className="h-[1px] my-10"></div>

          <div>
            <p style={{ fontFamily: "'North Wave', sans-serif", color: 'var(--dark-text)' }}
              className="text-[42px] md:text-[56px] mb-2">
              K. Ajoy Lawrence
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[14px] text-[#888888]">
              Referee – BFI Panel-A | Basketball Federation of India
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
