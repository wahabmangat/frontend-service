import {Component, OnInit} from "@angular/core";
import {DigitalAgreement} from "../catalogue/model/publish/digital-agreement";
import {CookieService} from "ng2-cookies";
import {BPEService} from "../bpe/bpe.service";
import {modifyDate, selectPartyName, selectPreferredValues} from "../common/utils";
import {CallStatus} from "../common/call-status";
/**
 * Created by suat on 28-Mar-18.
 */

@Component({
    selector: "frame-contract-tab",
    templateUrl: "./frame-contract-tab.component.html",
    styleUrls: ["./frame-contract-tab.component.css"]
})
export class FrameContractTabComponent implements OnInit {
    frameContracts: DigitalAgreement[] = [];
    frameContractsRetrievalCallStatus: CallStatus = new CallStatus();

    getProductName = selectPreferredValues;

    constructor(private bpeService: BPEService,
                private cookieService: CookieService) {}

    ngOnInit() {
        this.retrieveFrameContracts();
    }

    private retrieveFrameContracts(): void {
        let partyId = this.cookieService.get("company_id");
        this.frameContractsRetrievalCallStatus.submit();
        this.bpeService.getAllFrameContractsForParty(partyId).then(frameContracts => {
            this.frameContracts = frameContracts;
            this.frameContractsRetrievalCallStatus.callback(null, true);

        }).catch(error => {
            this.frameContractsRetrievalCallStatus.error("Failed to retrieve frame contracts");
        });
    }

    getCorrespondingPartyName(frameContract: DigitalAgreement ): string {
        let userPartyId = this.cookieService.get("company_id");

        for(let party of frameContract.participantParty) {
            if(party.partyIdentification[0].id != userPartyId) {
                return selectPartyName(party.partyName);
            }
        }
    }
}
