import { Database } from "../database/db";
import { UserRepository } from "../repositories/UserRepository";
import { IssueRepository } from "../repositories/IssueRepository";
import { AuthService } from "../services/AuthService";
import { IssueService } from "../services/IssueService";
import { EmailService } from "../services/EmailService";
import { AuthHandler } from "../handlers/AuthHandler";
import { IssueHandler } from "../handlers/IssueHandler";
import { UserHandler } from "../handlers/UserHandler";

export class Container {
    private static instance: Container;

    public userRepository: UserRepository;
    public issueRepository: IssueRepository;

    public authService: AuthService;
    public issueService: IssueService;
    public emailService: EmailService;

    public authHandler: AuthHandler;
    public issueHandler: IssueHandler;
    public userHandler: UserHandler;

    private constructor() {
        const db = Database.getInstance();

        this.emailService = new EmailService();
        this.userRepository = new UserRepository(db);
        this.issueRepository = new IssueRepository(db);

        this.authService = new AuthService(this.userRepository, this.emailService);
        this.issueService = new IssueService(this.issueRepository, this.userRepository, this.emailService);

        this.authHandler = new AuthHandler(this.authService);
        this.issueHandler = new IssueHandler(this.issueService);
        this.userHandler = new UserHandler(this.userRepository, this.emailService);
    }

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
}

export const container = Container.getInstance();
