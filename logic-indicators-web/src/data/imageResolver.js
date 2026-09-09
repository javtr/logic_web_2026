// src/data/imageResolver.js
// Mapea un imageKey (string) del JSON al asset real que Vite importa y procesa.
// Razón: queremos que los JSON solo contengan strings (no imports de Vite),
// y al mismo tiempo queremos que Vite siga hasheando y optimizando las imágenes.
//
// Cómo agregar una imagen nueva:
//   1. Agregar el import del asset arriba
//   2. Agregar la entrada al imageMap
//   3. En el JSON usar el imageKey correspondiente
import sampleIndicatorImage from '../assets/indicators/sample_image.png';
import suiteImage from '../assets/indicators/suite.png';
import footprintImage from '../assets/indicators/footprint.png';
import footerImage from '../assets/indicators/footer.png';
import profileImage from '../assets/indicators/profile.png';
import compositeImage from '../assets/indicators/composite.png';
import bigtradesImage from '../assets/indicators/bigtrades.png';
import analyticsImage from '../assets/indicators/analytics.png';
import algorithmsImage from '../assets/indicators/algorithms.png';
import footprint_d1Image from '../assets/indicators/footprint_d1.png';
import footprint_d2Image from '../assets/indicators/footprint_d2.png';
import footprint_d3Image from '../assets/indicators/footprint_d3.png';
import footer_d01Image from '../assets/indicators/footer_d01.png';
import footer_d02Image from '../assets/indicators/footer_d02.png';
import footer_d03Image from '../assets/indicators/footer_d03.png';
import profile_d01Image from '../assets/indicators/profile_d1.png';
import profile_d02Image from '../assets/indicators/profile_d2.png';
import profile_d03Image from '../assets/indicators/profile_d3.png';
import composite_d01Image from '../assets/indicators/composite_d1.png';
import composite_d02Image from '../assets/indicators/composite_d2.png';
import composite_d03Image from '../assets/indicators/composite_d3.png';
import bigtrades_d01Image from '../assets/indicators/bigtrades_d1.png';
import bigtrades_d02Image from '../assets/indicators/bigtrades_d2.png';
import bigtrades_d03Image from '../assets/indicators/bigtrades_d3.png';
import analytics_d01Image from '../assets/indicators/analytics_d1.png';
import analytics_d02Image from '../assets/indicators/analytics_d2.png';
import analytics_d03Image from '../assets/indicators/analytics_d3.png';
import algorithms_d01Image from '../assets/indicators/algorithms_d1.png';
import algorithms_d02Image from '../assets/indicators/algorithms_d2.png';
import algorithms_d03Image from '../assets/indicators/algorithms_d3.png';
import depthchartImage from '../assets/indicators/depthchart.png';
import depthchart_d1Image from '../assets/indicators/depthchart_d1.png';
import depthchart_d2Image from '../assets/indicators/depthchart_d2.png';
import depthchart_d3Image from '../assets/indicators/depthchart_d3.png';
import depthliveImage from '../assets/indicators/depthlive.png';
import depthlive_d1Image from '../assets/indicators/depthlive_d1.png';
import depthlive_d2Image from '../assets/indicators/depthlive_d2.png';
import depthlive_d3Image from '../assets/indicators/depthlive_d3.png';
import depthPackImage from '../assets/indicators/depth_pack.png';
// Imagenes del tutorial de instalacion en NinjaTrader 8.
// Usadas en el primer paso del wizard de instalacion (segun /resources
// en el schema del step tipo 'tutorial' en installation.js).
import ninjaInstall01Image from '../assets/installation/ninja_install_01.png';
import ninjaInstall02Image from '../assets/installation/ninja_install_02.png';
import downloadPresetImage from '../assets/installation/download_preset.png';
import loadPresetImage from '../assets/installation/load_preset.png';

// Presets individuales - Logic Footprint
import presetFootprintAtasImbalanceDark from '../assets/presets/preset_footprint_atas_imbalance_dark.png';
import presetFootprintAtasLight from '../assets/presets/preset_footprint_atas_light.png';
import presetFootprintBidxaskDark from '../assets/presets/preset_footprint_bidxask_dark.png';
import presetFootprintBidxaskLight from '../assets/presets/preset_footprint_bidxask_light.png';
import presetFootprintCarmineSierraDark from '../assets/presets/preset_footprint_carmine_sierra_dark.png';
import presetFootprintDale from '../assets/presets/preset_footprint_dale.png';
import presetFootprintDeltaDark from '../assets/presets/preset_footprint_delta_dark.png';
import presetFootprintDeltaLight from '../assets/presets/preset_footprint_delta_light.png';
import presetFootprintFabioDcDominant from '../assets/presets/preset_footprint_fabio_dc_dominant.png';
import presetFootprintFabioDcProfile from '../assets/presets/preset_footprint_fabio_dc_profile.png';
import presetFootprintKaizenSierra from '../assets/presets/preset_footprint_kaizen_sierra.png';
import presetFootprintUmarAtasDark from '../assets/presets/preset_footprint_umar_atas_dark.png';

// Presets individuales - Logic Footer
import presetFooterClassicDark from '../assets/presets/preset_footer_classic_dark.png';
import presetFooterClassicDataboxDark from '../assets/presets/preset_footer_classic_databox_dark.png';
import presetFooterClassicDataboxLight from '../assets/presets/preset_footer_classic_databox_light.png';
import presetFooterClassicLight from '../assets/presets/preset_footer_classic_light.png';
import presetFooterHeatmap from '../assets/presets/preset_footer_heatmap.png';
import presetFooterHeatmapBasic from '../assets/presets/preset_footer_heatmap_basic.png';

// Presets individuales - Logic Profile
import presetProfileTpoBlackLight from '../assets/presets/preset_profile_tpo_black_light.png';
import presetProfileTpoMagenta2Light from '../assets/presets/preset_profile_tpo_magenta_2_light.png';
import presetProfileTpoMagentaLight from '../assets/presets/preset_profile_tpo_magenta_light.png';
import presetProfileTpoMinimalistLight from '../assets/presets/preset_profile_tpo_minimalist_light.png';
import presetProfileTpoOrchid1Dark from '../assets/presets/preset_profile_tpo_orchid_1_dark.png';
import presetProfileTpoOrchid2Dark from '../assets/presets/preset_profile_tpo_orchid_2_dark.png';
import presetProfileTpoSierra from '../assets/presets/preset_profile_tpo_sierra.png';
import presetProfileTpoSmashSierra from '../assets/presets/preset_profile_tpo_smash_sierra.png';
import presetProfileTpoTradovate from '../assets/presets/preset_profile_tpo_tradovate.png';
import presetProfileVpBlueLight from '../assets/presets/preset_profile_vp_blue_light.png';
import presetProfileVpDcBlue from '../assets/presets/preset_profile_vp_dc_blue.png';
import presetProfileVpDcOrange from '../assets/presets/preset_profile_vp_dc_orange.png';
import presetProfileVpGeometricDark from '../assets/presets/preset_profile_vp_geometric_dark.png';
import presetProfileVpGeometricLight from '../assets/presets/preset_profile_vp_geometric_light.png';
import presetProfileVpGreenLight from '../assets/presets/preset_profile_vp_green_light.png';
import presetProfileVpLogicDark from '../assets/presets/preset_profile_vp_logic_dark.png';
import presetProfileVpMagentaLight from '../assets/presets/preset_profile_vp_magenta_light.png';
import presetProfileVpNinja from '../assets/presets/preset_profile_vp_ninja.png';
import presetProfileVpOrchidDark from '../assets/presets/preset_profile_vp_orchid_dark.png';

// Presets individuales - Logic Composite
import presetCompositeGreyBalanced from '../assets/presets/preset_composite_grey_balanced.png';
import presetCompositeGreyVpdZoomEs from '../assets/presets/preset_composite_grey_vpd_zoom_es.png';
import presetCompositeGreyVpdZoomNq from '../assets/presets/preset_composite_grey_vpd_zoom_nq.png';
import presetCompositeGreyVpd from '../assets/presets/preset_composite_grey_vpd.png';
import presetCompositeVpdDark from '../assets/presets/preset_composite_vpd_dark.png';
import presetCompositeVpdNq from '../assets/presets/preset_composite_vpd_nq.png';

// Presets individuales - Logic BigTrades
import presetBigtradesBtFootprintEs from '../assets/presets/preset_bigtrades_bt_footprint_es.png';
import presetBigtradesBtFootprintNq from '../assets/presets/preset_bigtrades_bt_footprint_nq.png';
import presetBigtradesBtHistogramEs from '../assets/presets/preset_bigtrades_bt_histogram_es.png';
import presetBigtradesBtHistogramNq from '../assets/presets/preset_bigtrades_bt_histogram_nq.png';

// Presets individuales - Logic Analytics
import presetAnalyticsAnalyticsLight from '../assets/presets/preset_analytics_analytics_light.png';

// Presets individuales - Logic Algorithms
import presetAlgorithmsAbsorptionEs from '../assets/presets/preset_algorithms_absorption_es.png';
import presetAlgorithmsAbsorptionMes from '../assets/presets/preset_algorithms_absorption_mes.png';
import presetAlgorithmsAbsorptionMnq from '../assets/presets/preset_algorithms_absorption_mnq.png';
import presetAlgorithmsAbsorptionNq from '../assets/presets/preset_algorithms_absorption_nq.png';

// Presets individuales - Logic Depth Chart
import presetDepthchartDualThermal from '../assets/presets/preset_depthchart_dual_thermal.png';
import presetDepthchartSingleClassicBookmap from '../assets/presets/preset_depthchart_single_classic_bookmap.png';
import presetDepthchartSingleFullSpectrum from '../assets/presets/preset_depthchart_single_full_spectrum.png';
import presetDepthchartSingleNeonMagenta from '../assets/presets/preset_depthchart_single_neon_magenta.png';
import presetDepthchartSingleObsidianGold from '../assets/presets/preset_depthchart_single_obsidian_gold.png';
import presetDepthchartSinglePeachTwilight from '../assets/presets/preset_depthchart_single_peach_twilight.png';
import presetDepthchartSolidFrost from '../assets/presets/preset_depthchart_solid_frost.png';

// Presets individuales - Logic Depth Live
import presetDepthliveDualThermal from '../assets/presets/preset_depthlive_dual_thermal.png';
import presetDepthliveSingleClassicBookmap from '../assets/presets/preset_depthlive_single_classic_bookmap.png';
import presetDepthliveSingleNeonMagenta from '../assets/presets/preset_depthlive_single_neon_magenta.png';
import presetDepthliveSinglePeachTwilight from '../assets/presets/preset_depthlive_single_peach_twilight.png';
import presetDepthliveSolidFrost from '../assets/presets/preset_depthlive_solid_frost.png';

export const imageMap = {
  // Presets Logic Footprint
  preset_footprint_atas_imbalance_dark: presetFootprintAtasImbalanceDark,
  preset_footprint_atas_light: presetFootprintAtasLight,
  preset_footprint_bidxask_dark: presetFootprintBidxaskDark,
  preset_footprint_bidxask_light: presetFootprintBidxaskLight,
  preset_footprint_carmine_sierra_dark: presetFootprintCarmineSierraDark,
  preset_footprint_dale: presetFootprintDale,
  preset_footprint_delta_dark: presetFootprintDeltaDark,
  preset_footprint_delta_light: presetFootprintDeltaLight,
  preset_footprint_fabio_dc_dominant: presetFootprintFabioDcDominant,
  preset_footprint_fabio_dc_profile: presetFootprintFabioDcProfile,
  preset_footprint_kaizen_sierra: presetFootprintKaizenSierra,
  preset_footprint_umar_atas_dark: presetFootprintUmarAtasDark,

  // Presets Logic Footer
  preset_footer_classic_dark: presetFooterClassicDark,
  preset_footer_classic_databox_dark: presetFooterClassicDataboxDark,
  preset_footer_classic_databox_light: presetFooterClassicDataboxLight,
  preset_footer_classic_light: presetFooterClassicLight,
  preset_footer_heatmap: presetFooterHeatmap,
  preset_footer_heatmap_basic: presetFooterHeatmapBasic,

  // Presets Logic Profile
  preset_profile_tpo_black_light: presetProfileTpoBlackLight,
  preset_profile_tpo_magenta_2_light: presetProfileTpoMagenta2Light,
  preset_profile_tpo_magenta_light: presetProfileTpoMagentaLight,
  preset_profile_tpo_minimalist_light: presetProfileTpoMinimalistLight,
  preset_profile_tpo_orchid_1_dark: presetProfileTpoOrchid1Dark,
  preset_profile_tpo_orchid_2_dark: presetProfileTpoOrchid2Dark,
  preset_profile_tpo_sierra: presetProfileTpoSierra,
  preset_profile_tpo_smash_sierra: presetProfileTpoSmashSierra,
  preset_profile_tpo_tradovate: presetProfileTpoTradovate,
  preset_profile_vp_blue_light: presetProfileVpBlueLight,
  preset_profile_vp_dc_blue: presetProfileVpDcBlue,
  preset_profile_vp_dc_orange: presetProfileVpDcOrange,
  preset_profile_vp_geometric_dark: presetProfileVpGeometricDark,
  preset_profile_vp_geometric_light: presetProfileVpGeometricLight,
  preset_profile_vp_green_light: presetProfileVpGreenLight,
  preset_profile_vp_logic_dark: presetProfileVpLogicDark,
  preset_profile_vp_magenta_light: presetProfileVpMagentaLight,
  preset_profile_vp_ninja: presetProfileVpNinja,
  preset_profile_vp_orchid_dark: presetProfileVpOrchidDark,

  // Presets Logic Composite
  preset_composite_grey_balanced: presetCompositeGreyBalanced,
  preset_composite_grey_vpd_zoom_es: presetCompositeGreyVpdZoomEs,
  preset_composite_grey_vpd_zoom_nq: presetCompositeGreyVpdZoomNq,
  preset_composite_grey_vpd: presetCompositeGreyVpd,
  preset_composite_vpd_dark: presetCompositeVpdDark,
  preset_composite_vpd_nq: presetCompositeVpdNq,

  // Presets Logic BigTrades
  preset_bigtrades_bt_footprint_es: presetBigtradesBtFootprintEs,
  preset_bigtrades_bt_footprint_nq: presetBigtradesBtFootprintNq,
  preset_bigtrades_bt_histogram_es: presetBigtradesBtHistogramEs,
  preset_bigtrades_bt_histogram_nq: presetBigtradesBtHistogramNq,

  // Presets Logic Analytics
  preset_analytics_analytics_light: presetAnalyticsAnalyticsLight,

  // Presets Logic Algorithms
  preset_algorithms_absorption_es: presetAlgorithmsAbsorptionEs,
  preset_algorithms_absorption_mes: presetAlgorithmsAbsorptionMes,
  preset_algorithms_absorption_mnq: presetAlgorithmsAbsorptionMnq,
  preset_algorithms_absorption_nq: presetAlgorithmsAbsorptionNq,

  // Presets Logic Depth Chart
  preset_depthchart_dual_thermal: presetDepthchartDualThermal,
  preset_depthchart_single_classic_bookmap: presetDepthchartSingleClassicBookmap,
  preset_depthchart_single_full_spectrum: presetDepthchartSingleFullSpectrum,
  preset_depthchart_single_neon_magenta: presetDepthchartSingleNeonMagenta,
  preset_depthchart_single_obsidian_gold: presetDepthchartSingleObsidianGold,
  preset_depthchart_single_peach_twilight: presetDepthchartSinglePeachTwilight,
  preset_depthchart_solid_frost: presetDepthchartSolidFrost,

  // Presets Logic Depth Live
  preset_depthlive_dual_thermal: presetDepthliveDualThermal,
  preset_depthlive_single_classic_bookmap: presetDepthliveSingleClassicBookmap,
  preset_depthlive_single_neon_magenta: presetDepthliveSingleNeonMagenta,
  preset_depthlive_single_peach_twilight: presetDepthliveSinglePeachTwilight,
  preset_depthlive_solid_frost: presetDepthliveSolidFrost,
  // Fallback / placeholder (también usado por deepchart y deeplive hasta tener imagen propia)
  sample_indicator: sampleIndicatorImage,
  // Banner de Home (entre hero y la grilla de la suite premium)
  suite: suiteImage,
  // Indicadores con imagen propia
  footprint: footprintImage,
  footer: footerImage,
  profile: profileImage,
  composite: compositeImage,
  bigtrades: bigtradesImage,
  analytics: analyticsImage,
  algorithms: algorithmsImage,
  depthchart: depthchartImage,
  depth_chart: depthchartImage,
  depthlive: depthliveImage,
  depth_live: depthliveImage,
  depth_pack: depthPackImage,
  depthpack: depthPackImage,
  'depth_pack.png': depthPackImage,
  // Variantes por profundidad de mercado (depth). Los archivos son *_d1.png,
  // *_d2.png, *_d3.png — las keys siguen esa misma convención.
  footprint_d1: footprint_d1Image,
  footprint_d2: footprint_d2Image,
  footprint_d3: footprint_d3Image,
  footer_d1: footer_d01Image,
  footer_d2: footer_d02Image,
  footer_d3: footer_d03Image,
  profile_d1: profile_d01Image,
  profile_d2: profile_d02Image,
  profile_d3: profile_d03Image,
  composite_d1: composite_d01Image,
  composite_d2: composite_d02Image,
  composite_d3: composite_d03Image,
  bigtrades_d1: bigtrades_d01Image,
  bigtrades_d2: bigtrades_d02Image,
  bigtrades_d3: bigtrades_d03Image,
  analytics_d1: analytics_d01Image,
  analytics_d2: analytics_d02Image,
  analytics_d3: analytics_d03Image,
  algorithms_d1: algorithms_d01Image,
  algorithms_d2: algorithms_d02Image,
  algorithms_d3: algorithms_d03Image,
  depthchart_d1: depthchart_d1Image,
  depthchart_d2: depthchart_d2Image,
  depthchart_d3: depthchart_d3Image,
  depthlive_d1: depthlive_d1Image,
  depthlive_d2: depthlive_d2Image,
  depthlive_d3: depthlive_d3Image,

  // Tutorial de importacion de presets (pagina /resources/presets).
  tutorial_step_1: downloadPresetImage,
  tutorial_step_2: loadPresetImage,
  download_preset: downloadPresetImage,
  load_preset: loadPresetImage,

  // Tutorial del wizard de instalacion (Dashboard). Estas imagenes
  // muestran el proceso general de instalar indicadores en NinjaTrader 8
  // y se renderizan dentro del primer paso del wizard (tipo 'tutorial'
  // en installation.js). Las keys son las que usa el i18n para apuntar
  // a las imagenes desde el sub-step 2 ("Install the indicators in NT8").
  installation_ninja_01: ninjaInstall01Image,
  installation_ninja_02: ninjaInstall02Image,

  
};

export const resolveImage = (imageKey) => {
  const image = imageMap[imageKey];
  if (!image) {
    if (import.meta.env.DEV) {
      console.warn(`[imageResolver] Unknown imageKey: "${imageKey}". Available: ${Object.keys(imageMap).join(', ')}`);
    }
    // Importación directa: Vite tree-shakea el imageMap pero este asset sigue en el bundle.
    return sampleIndicatorImage; // fallback seguro
  }
  return image;
};
