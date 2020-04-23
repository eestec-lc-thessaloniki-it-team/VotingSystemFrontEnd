import {Injectable} from '@angular/core';
import {Translations, TranslationSection} from '../../../shared/models/translations';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class I18nService {

    private translationsObs: Observable<Translations>;
    private translations: Translations;

    constructor(private httpClient: HttpClient) {
    }

    async getTranslationsSection(section: string): Promise<TranslationSection> {
        await this.initialize();
        return this.translations[section];
    }

    private async initialize() {
        if (!this.translationsObs) {
            this.translationsObs = this.getTranslations();
            this.translations = await this.translationsObs.toPromise();
        }
    }

    private getTranslations(): Observable<Translations> {
        return this.httpClient.get<Translations>('/assets/translations.json');
    }
}
