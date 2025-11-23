import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-colon-biopsy',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './colon-biopsy.html',
  styleUrl: './colon-biopsy.css',
})
export class ColonBiopsy {
  pathologyReportForm!: FormGroup;
  outputData = "";

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.pathologyReportForm = this.fb.group({
      // Specimen
      specimen: this.fb.group({
        procedure: [''],
        procedureOther: [''],
        specimenIntergrity: [''],
      }),

      // Tumor
      tumor: this.fb.group({
        // Site
        site: [''],
        siteOther: [''],

        // Histologic Type
        histologicType: [''],
        histologicTypeOther: [''],
        histologicExplanation: [''],
        histologicComment: [''],

        // Histologic Grade 
        histologicGrade: [''],
        histologicGradeOther: [''],
        histologicGradeExplain: [''],

        // Size of Invasive Carcinoma 
        sizeGreatestDimension: [''],
        sizeAdditionalDimensions: [''],
        sizeExplain: [''],

        // Tumor Extent 
        tumorExtent: [''],
        tumorExtentExplain: [''],

        // Depth of Sub-mucosal Invasion
        depthSubmucosalInvasion: [''],
        depthExact: [''],
        depthExplain: [''],

        // Lymphatic and / or Vascular Invasion
        lymphaticVascularInvasion: [''],
        lymphaticVascularInvasionExplain: [''],

        // Perineural Invasion
        perineuralInvasion: [''],
        perineuralInvasionExplain: [''],

        // Tumor Budding Score
        tumorBudding: [''],
        tumorBuddingExplain: [''],
        // Number of Tumor Buds
        numberTumorBuds: [''],
        numberTumorBudsSpecify: [''],
        numberTumorBudsOther: [''],
        numberTumorBudsExplain: [''],

        // Type of Polyp in which Invasive Carcinoma Arose
        typeOfPolyp: [''],
        typeOfPolypOther: [''],

        // Polyp Size (required only for polypectomy specimens)
        polypSize: [''],
        polypGreatestDimension: [''],
        polypAdditionalDimensions: [''],
        polypSizeExplain: [''],

        // Polyp Configuration (required only for polypectomy specimens) 
        polypConfiguration: [''],
        stalkLength: [''],
        stalkLengthCm: [''],
        stalkLengthOther: [''],
        stalkLengthExplain: [''],

        // Tumor Dimension(s) (required only for intact endoscopic mucosal resections / transanal disk excision / endoscopic mucosal dissection)
        tumorDimensions: [''],
        tumorGreatestDimension: [''],
        tumorAdditionalDimensions: [''],
        tumorDimensionsExplain: [''],

        // Margin Orientation Status (required only if applicable) 
        marginOrientationStatus: [''],

        // Number of Specimen Fragments (required only if specimen is fragmented)
        numberSpecimenFragments: [''],
        numberSpecimenFragmentsExactNumber: [''],

        // Dimension of Largest Fragment
        dimensionLargestFragment: [''],
        dimensionLargestFragmentCm: [''],
        dimensionLargestFragmentAdditional: [''],
        dimensionLargestFragmentExplain: [''],

        // Tumor Comment
        tumorComment: [''],

      }),

      // Margins
      margins: this.fb.group({
        // Margin Status for Invasive Carcinoma
        marginsStatusForInvasiveCarcinoma: [''],
        allMarginsNegative: [false],
        marginStatusInvasiveCarcinoma: [''],
        marginStatusInvasiveCarcinomaOther: [''],
        marginStatusInvasiveCarcinomaExplain: [''],
        marginNotApplicable: [false],


        // Distance from Invasive Carcinoma to Deep / Stalk Margin
        distanceFromDeepStalkMargin: [''],
        distanceFromDeepStalkMarginCm: [''],
        distanceFromDeepStalkMarginOther: [''],
        distanceFromDeepStalkMarginExplain: [''],


        // Distance from Invasive Carcinoma to Peripheral / Lateral Mucosal Margin
        distanceFromPeripheralLateralMargin: [''],
        distanceFromPeripheralLateralMarginCm: [''],
        distanceFromPeripheralLateralMarginOther: [''],
        distanceFromPeripheralLateralMarginExplain: [''],

        invasiveCarcinomaPresentAtMargin: [false],
        // Margin(s) Involved by Invasive Carcinoma (select all that apply)
        marginInvolvedByInvasiveCarcinoma: this.fb.group({
          deepStalk: [false],
          deepStalkText: [''],
          peripheralLateralMucosal: [false],
          other: [false],
          otherText: [''],
          cannotBeDetermined: [false],
          cannotBeDeterminedText: [''],
          notApplicable: [false]
        }),
        // Margin Status for Non-Invasive Tumor (select all that apply)
        marginStatusNonInvasiveTumor: this.fb.group({
          allMarginsNegativeForAdenoma: [false],
          adenomaPresentAtMucosalMargin: [false],
          adenomaPresentAtMucosalMarginText: [''],
          other: [false],
          otherText: [''],
          cannotBeDetermined: [false],
          cannotBeDeterminedText: [''],
          notApplicable: [false]
        }),
        // Margin Comment
        marginComment: [''],
      }),

      // Additional Findings
      additionalFindings: this.fb.group({
        noneIdentified: [false],
        ulcerativeColitis: [false],
        crohnDisease: [false],
        otherPolyps: [false],
        otherPolypsText: [''],
        other: [false],
        otherText: ['']
      }),

      // Special Studies (Note H)

      // Comments
      comments: ['']


    });
  }

  onSubmit(): void {
    if (this.pathologyReportForm.valid) {
      console.clear();
      console.log('Form Submitted!', this.pathologyReportForm.value);
      this.outputData = "";
      const data = this.pathologyReportForm.value;

      // Specimen
      if (data.specimen.procedure) {
        this.outputData += `SPECIMEN\n`;
        this.outputData += `\tProcedure: `;
        this.outputData += `${data.specimen.procedure} ${data.specimen.procedure == 'Other (specify)' ? `${data.specimen.procedureOther}` : ''}\n`;
        this.outputData += `\tSpecimen Integrity: `;
        this.outputData += `${data.specimen.specimenIntergrity}\n\n`;
      }

      // Tumor
      if (Object.values(data.tumor as Record<string, string>).some(v => v.trim() !== "")) {
        this.outputData += `TUMOR\n`;
        // Site
        if (data.tumor.site) {
          this.outputData += `\tTumor Site: `;
          this.outputData += `${data.tumor.site} ${data.tumor.site == 'Other (specify)' ? `${data.tumor.siteOther}` : ''}\n`;
        }
        // Histologic Type
        if (data.tumor.histologicType) {
          this.outputData += `\tHistologic Type: `;
          this.outputData += `${data.tumor.histologicType} ${data.tumor.histologicType == 'Other (specify):' ? `${data.tumor.histologicTypeOther}` : ''}\n`;
          if (data.tumor.histologicComment) {
            this.outputData += `\tHistologic Type Comment: ${data.tumor.histologicComment}\n`;
          }
        }
        // Histologic Grade
        if (data.tumor.histologicGrade) {
          this.outputData += `\tHistologic Grade: `;
          this.outputData += `${data.tumor.histologicGrade} ${['Other (specify):', 'Not applicable (specify):'].includes(data.tumor.histologicGrade) ? `${data.tumor.histologicGradeOther}` : ''}\n`;
          if (data.tumor.histologicGradeExplain) {
            this.outputData += `\t${data.tumor.histologicGradeExplain}\n`;
          }

          // Size of Invasive Carcinoma
          if (data.tumor.sizeGreatestDimension || data.tumor.sizeAdditionalDimensions || data.tumor.sizeExplain) {
            this.outputData += `\tSize of Invasive Carcinoma: \n`;
            if (data.tumor.sizeGreatestDimension) {
              this.outputData += `\t\tGreatest dimension in Centimeters (cm): ${data.tumor.sizeGreatestDimension} cm\n`;
            }
            if (data.tumor.sizeAdditionalDimensions) {
              this.outputData += `\t\tAdditional Dimension in Centimeters (cm): ${data.tumor.sizeAdditionalDimensions} cm\n`;
            }
            if (data.tumor.sizeExplain) {
              this.outputData += `\t\tSize cannot be determined (explain):${data.tumor.sizeExplain}\n`;
            }
          }
        }

        // Tumor Extent
        if (data.tumor.tumorExtent) {
          this.outputData += `\tTumor Extent: ${data.tumor.tumorExtent}`;
          if (data.tumor.tumorExtentExplain) {
            this.outputData += ` ${data.tumor.tumorExtentExplain}\n`;
          }

          //+Depth of Sub-mucosal Invasion
          if (data.tumor.depthSubmucosalInvasion) {
            this.outputData += `\n\tDepth of Sub-mucosal Invasion: ${data.tumor.depthSubmucosalInvasion}`;
            if (data.tumor.depthExact) {
              this.outputData += ` ${data.tumor.depthExact} mm`;
            }
            if (data.tumor.depthExplain) {
              this.outputData += ` ${data.tumor.depthExplain}\n`;
            } else {
              this.outputData += `\n`;
            }
          }
        }

        // Lymphatic and / or Vascular Invasion
        if (data.tumor.lymphaticVascularInvasion) {
          this.outputData += `\tLymphatic and/or Vascular Invasion: ${data.tumor.lymphaticVascularInvasion}`;
          if (data.tumor.lymphaticVascularInvasionExplain) {
            this.outputData += ` ${data.tumor.lymphaticVascularInvasionExplain}\n`;
          } else {
            this.outputData += `\n`;
          }
        }

        // Perineural Invasion
        if (data.tumor.perineuralInvasion) {
          this.outputData += `\tPerineural Invasion: ${data.tumor.perineuralInvasion}`;
          if (data.tumor.perineuralInvasionExplain) {
            this.outputData += ` ${data.tumor.perineuralInvasionExplain}\n`;
          } else {
            this.outputData += `\n`;
          }
        }

        // Tumor Budding Score
        if (data.tumor.tumorBudding) {
          this.outputData += `\tTumor Budding Score: ${data.tumor.tumorBudding}`;
          if (data.tumor.tumorBuddingExplain) {
            this.outputData += ` ${data.tumor.tumorBuddingExplain}\n`;
          } else {
            this.outputData += `\n`;
          }

          // Number of Tumor Buds
          if (data.tumor.numberTumorBuds) {
            this.outputData += `\tNumber of Tumor Buds: ${data.tumor.numberTumorBuds}`;
            if (data.tumor.numberTumorBuds === "Specify number in one 'hotspot' field (in an area = 0.785 mm2):") {
              this.outputData += ` ${data.tumor.numberTumorBudsSpecify} per 'hotspot'`;
            } else if (data.tumor.numberTumorBuds === 'Other (specify):') {
              this.outputData += ` ${data.tumor.tumorBudsOther}`;
            }
            if (data.tumor.tumorBudsExplain) {
              this.outputData += ` ${data.tumor.tumorBudsExplain}\n`;
            } else {
              this.outputData += `\n`;
            }
          }
        }

        // Type of Polyp in which Invasive Carcinoma Arose
        if (data.tumor.typeOfPolyp) {
          this.outputData += `\tType of Polyp: ${data.tumor.typeOfPolyp} ${data.tumor.typeOfPolyp === 'Other (specify):' ? `${data.tumor.typeOfPolypOther}` : ''}\n`;
        }

        // Polyp Size
        if (data.tumor.polypSize) {
          if (data.tumor.polypSize !== 'Not applicable') {
            this.outputData += `\tPolyp Size: `;
            if (data.tumor.polypGreatestDimension) {
              this.outputData += `Greatest dimension: ${data.tumor.polypGreatestDimension} cm`;
            }
            if (data.tumor.polypAdditionalDimensions) {
              this.outputData += ` Additional Dimension: ${data.tumor.polypAdditionalDimensions} cm`;
            }
            if (data.tumor.polypSizeExplain) {
              this.outputData += ` Cannot be determined: ${data.tumor.polypSizeExplain}`;
            }
            this.outputData += `\n`;
          }
        }

        // Polyp Configuration
        if (data.tumor.polypConfiguration) {
          if (data.tumor.polypConfiguration !== 'Not applicable') {
            this.outputData += `\tPolyp Configuration: ${data.tumor.polypConfiguration}`;
            if (data.tumor.polypConfiguration === 'Pedunculated with stalk' && data.tumor.stalkLength) {
              this.outputData += ` - Stalk Length: ${data.tumor.stalkLength}`;
              if (data.tumor.stalkLength === 'Specify length in Centimeters (cm):') {
                this.outputData += ` ${data.tumor.stalkLengthCm} cm`;
              } else if (data.tumor.stalkLength === 'Other (specify):') {
                this.outputData += ` ${data.tumor.stalkLengthOther}`;
              }
            }
            this.outputData += `\n`;
          }
        }

        // Tumor Dimensions
        if (data.tumor.tumorDimensions) {
          if (data.tumor.tumorDimensions !== 'Not applicable') {
            this.outputData += `\tTumor Dimensions: `;
            if (data.tumor.tumorGreatestDimension) {
              this.outputData += `Greatest dimension: ${data.tumor.tumorGreatestDimension} cm`;
            }
            if (data.tumor.tumorAdditionalDimensions) {
              this.outputData += ` Additional Dimension: ${data.tumor.tumorAdditionalDimensions} cm`;
            }
            if (data.tumor.tumorDimensionsExplain) {
              this.outputData += ` Cannot be determined: ${data.tumor.tumorDimensionsExplain}`;
            }
            this.outputData += `\n`;
          }
        }

        // Margin Orientation Status
        if (data.tumor.marginOrientationStatus) {
          if (data.tumor.marginOrientationStatus !== 'Not applicable') {
            this.outputData += `\tMargin Orientation Status: ${data.tumor.marginOrientationStatus}\n`;
          }
        }

        // Number of Specimen Fragments
        if (data.tumor.numberSpecimenFragments) {
          if (data.tumor.numberSpecimenFragments !== 'Not applicable') {
            this.outputData += `\tNumber of Specimen Fragments: ${data.tumor.numberSpecimenFragments}`;
            if (data.tumor.numberSpecimenFragments === 'Exact number (specify):') {
              this.outputData += ` ${data.tumor.numberSpecimenFragmentsExactNumber}`;
            }
            this.outputData += `\n`;
          }
        }

        // Dimension of Largest Fragment
        if (data.tumor.dimensionLargestFragment) {
          if (data.tumor.dimensionLargestFragment !== 'Not applicable') {
            this.outputData += `\tDimension of Largest Fragment: `;
            if (data.tumor.dimensionLargestFragmentCm) {
              this.outputData += `${data.tumor.dimensionLargestFragmentCm} cm`;
            }
            if (data.tumor.dimensionLargestFragmentAdditional) {
              this.outputData += ` Additional: ${data.tumor.dimensionLargestFragmentAdditional} cm`;
            }
            if (data.tumor.dimensionLargestFragmentExplain) {
              this.outputData += ` Cannot be determined: ${data.tumor.dimensionLargestFragmentExplain}`;
            }
            this.outputData += `\n`;
          }
        }

        // Tumor Comment
        if (data.tumor.tumorComment) {
          this.outputData += `\tTumor Comment: ${data.tumor.tumorComment}\n`;
        }

        this.outputData += `\n`;
      }

      // Margins
      if (Object.values(data.margins as Record<string, any>).some(v => {
        if (typeof v === 'string') return v.trim() !== "";
        if (typeof v === 'boolean') return v;
        if (typeof v === 'object') return Object.values(v).some(x => (typeof x === 'string' ? x.trim() : x) !== "");
        return false;
      })) {
        this.outputData += `MARGINS\n`;

        // Margin Status for Invasive Carcinoma
        if (data.margins.allMarginsNegative) {
          this.outputData += `\tMargin Status for Invasive Carcinoma: All margins negative\n`;
        } else if (data.margins.marginStatusInvasiveCarcinoma) {
          this.outputData += `\tMargin Status for Invasive Carcinoma: ${data.margins.marginStatusInvasiveCarcinoma} ${data.margins.marginStatusInvasiveCarcinoma === 'Other (specify):' ? `${data.margins.marginStatusInvasiveCarcinomaOther}` : ''}\n`;
          if (data.margins.marginStatusInvasiveCarcinomaExplain) {
            this.outputData += `\t\t${data.margins.marginStatusInvasiveCarcinomaExplain}\n`;
          }
        }

        // Distance from Invasive Carcinoma to Deep / Stalk Margin
        if (data.margins.distanceFromDeepStalkMargin) {
          this.outputData += `\tDistance from Invasive Carcinoma to Deep/Stalk Margin: ${data.margins.distanceFromDeepStalkMargin}`;
          if (data.margins.distanceFromDeepStalkMarginCm) {
            this.outputData += ` ${data.margins.distanceFromDeepStalkMarginCm} cm`;
          } else if (data.margins.distanceFromDeepStalkMarginOther) {
            this.outputData += ` ${data.margins.distanceFromDeepStalkMarginOther}`;
          }
          this.outputData += `\n`;
        }

        // Distance from Invasive Carcinoma to Peripheral / Lateral Mucosal Margin
        if (data.margins.distanceFromPeripheralLateralMargin) {
          this.outputData += `\tDistance from Invasive Carcinoma to Peripheral/Lateral Margin: ${data.margins.distanceFromPeripheralLateralMargin}`;
          if (data.margins.distanceFromPeripheralLateralMarginCm) {
            this.outputData += ` ${data.margins.distanceFromPeripheralLateralMarginCm} cm`;
          } else if (data.margins.distanceFromPeripheralLateralMarginOther) {
            this.outputData += ` ${data.margins.distanceFromPeripheralLateralMarginOther}`;
          }
          this.outputData += `\n`;
        }

        // Invasive Carcinoma Present at Margin
        if (data.margins.invasiveCarcinomaPresentAtMargin) {
          this.outputData += `\tInvasive carcinoma present at margin\n`;

          // Margins Involved by Invasive Carcinoma
          const marginInvolved = data.margins.marginInvolvedByInvasiveCarcinoma;
          if (marginInvolved.deepStalk || marginInvolved.peripheralLateralMucosal || marginInvolved.other || marginInvolved.cannotBeDetermined) {
            this.outputData += `\tMargin(s) Involved by Invasive Carcinoma:\n`;
            if (marginInvolved.deepStalk) {
              this.outputData += `\t\tDeep/Stalk ${marginInvolved.deepStalkText ? `: ${marginInvolved.deepStalkText}` : ''}\n`;
            }
            if (marginInvolved.peripheralLateralMucosal) {
              this.outputData += `\t\tPeripheral/Lateral Mucosal\n`;
            }
            if (marginInvolved.other) {
              this.outputData += `\t\tOther ${marginInvolved.otherText ? `: ${marginInvolved.otherText}` : ''}\n`;
            }
            if (marginInvolved.cannotBeDetermined) {
              this.outputData += `\t\tCannot be determined ${marginInvolved.cannotBeDeterminedText ? `: ${marginInvolved.cannotBeDeterminedText}` : ''}\n`;
            }
          }
        } else {
          // Margin Status for Non-Invasive Tumor
          const marginNonInvasive = data.margins.marginStatusNonInvasiveTumor;
          if (marginNonInvasive.allMarginsNegativeForAdenoma || marginNonInvasive.adenomaPresentAtMucosalMargin || marginNonInvasive.other || marginNonInvasive.cannotBeDetermined) {
            this.outputData += `\tMargin Status for Non-Invasive Tumor:\n`;
            if (marginNonInvasive.allMarginsNegativeForAdenoma) {
              this.outputData += `\t\tAll margins negative for adenoma\n`;
            }
            if (marginNonInvasive.adenomaPresentAtMucosalMargin) {
              this.outputData += `\t\tAdenoma present at mucosal margin ${marginNonInvasive.adenomaPresentAtMucosalMarginText ? `: ${marginNonInvasive.adenomaPresentAtMucosalMarginText}` : ''}\n`;
            }
            if (marginNonInvasive.other) {
              this.outputData += `\t\tOther ${marginNonInvasive.otherText ? `: ${marginNonInvasive.otherText}` : ''}\n`;
            }
            if (marginNonInvasive.cannotBeDetermined) {
              this.outputData += `\t\tCannot be determined ${marginNonInvasive.cannotBeDeterminedText ? `: ${marginNonInvasive.cannotBeDeterminedText}` : ''}\n`;
            }
          }
        }

        // Margin Comment
        if (data.margins.marginComment) {
          this.outputData += `\tMargin Comment: ${data.margins.marginComment}\n`;
        }

        this.outputData += `\n`;
      }

      // Additional Findings
      if (Object.values(data.additionalFindings as Record<string, any>).some(v => (typeof v === 'string' ? v.trim() : v) !== "")) {
        this.outputData += `ADDITIONAL FINDINGS\n`;

        if (data.additionalFindings.noneIdentified) {
          this.outputData += `\tNone identified\n`;
        } else {
          if (data.additionalFindings.ulcerativeColitis) {
            this.outputData += `\tUlcerative Colitis\n`;
          }
          if (data.additionalFindings.crohnDisease) {
            this.outputData += `\tCrohn Disease\n`;
          }
          if (data.additionalFindings.otherPolyps) {
            this.outputData += `\tOther Polyps ${data.additionalFindings.otherPolypsText ? `: ${data.additionalFindings.otherPolypsText}` : ''}\n`;
          }
          if (data.additionalFindings.other) {
            this.outputData += `\tOther ${data.additionalFindings.otherText ? `: ${data.additionalFindings.otherText}` : ''}\n`;
          }
        }

        this.outputData += `\n`;
      }

      // Comments
      if (data.comments) {
        this.outputData += `COMMENTS\n`;
        this.outputData += `\t${data.comments}\n\n`;
      }
    }
  }

  // Button to copy final output to clipboard
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.outputData).then(() => {
      alert('Output data copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy output data to clipboard.');
    });
  }
}


























































