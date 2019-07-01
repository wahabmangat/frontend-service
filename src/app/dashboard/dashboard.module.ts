import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {AppCommonModule} from "../common/common.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DashboardRoutingModule} from "./dashboard-routing.module";

import {DashboardThreadedComponent} from "./dashboard-threaded.component";
import {ThreadSummaryComponent} from "./thread-summary.component";
import {FacetComponent} from "./facet-component";
import { CatalogueModule } from "../catalogue/catalogue.module";
import { BPEModule } from "../bpe/bpe.module";
import { AnalyticsModule } from "../analytics/analytics.module";
import { ThreadEventComponent } from "./thread-event.component";
import {FrameContractTabComponent} from "./frame-contract-tab.component";

@NgModule({
	imports: [
		CommonModule,
		AppCommonModule,
		FormsModule,
		HttpModule,
		ReactiveFormsModule,
		DashboardRoutingModule,
		CatalogueModule,
		AnalyticsModule,
		BPEModule,
		NgbModule.forRoot()
	],
	declarations: [
		DashboardThreadedComponent,
		ThreadSummaryComponent,
		ThreadEventComponent,
		FacetComponent,
		FrameContractTabComponent
	],
	exports: [
		DashboardThreadedComponent,
		ThreadSummaryComponent,
		FacetComponent
	],
	providers: [
	]
})

export class DashboardModule {}
